from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import aiohttp
from bs4 import BeautifulSoup
import FinanceDataReader as fdr
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cache for stock tickers
krx_df = pd.DataFrame()

@app.on_event("startup")
async def startup_event():
    global krx_df
    try:
        krx_df = fdr.StockListing("KRX")
        print(f"Loaded {len(krx_df)} stocks from KRX")
    except Exception as e:
        print("Failed to load KRX data", e)

@app.get("/api/search")
async def search_stock(q: str):
    if krx_df.empty:
        return {"results": []}
    
    mask = krx_df['Name'].str.contains(q, case=False, na=False) | krx_df['Code'].str.contains(q, case=False, na=False)
    matches = krx_df[mask].head(10)
    
    results = []
    for _, row in matches.iterrows():
        results.append({
            "code": row["Code"],
            "name": row["Name"]
        })
    return {"results": results}

async def fetch_page(session, code, page):
    url = f"https://finance.naver.com/item/frgn.naver?code={code}&page={page}"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
    async with session.get(url, headers=headers) as response:
        return await response.text()

@app.get("/api/stock/{stock_code}")
async def get_stock_data(stock_code: str):
    # Fetch ~130 pages (approx 10 years of daily data = 2500+ days)
    pages = range(1, 131)
    
    # 네이버 증권 서버 부하 방지를 위해 동시 요청 50개로 제한
    sem = asyncio.Semaphore(50)
    
    async def fetch_with_sem(session, code, p):
        async with sem:
            return await fetch_page(session, code, p)

    async with aiohttp.ClientSession() as session:
        tasks = [fetch_with_sem(session, stock_code, p) for p in pages]
        htmls = await asyncio.gather(*tasks)
        
    data = []
    for html in htmls:
        soup = BeautifulSoup(html, "html.parser")
        rows = soup.select("table.type2 > tr")
        for row in rows:
            tds = row.find_all("td")
            if len(tds) < 9: continue
            try:
                date = tds[0].text.strip()
                closeelt = tds[1].text.strip().replace(",", "")
                # Some dates or prices might be empty rows
                if not closeelt.isdigit():
                    continue
                    
                foreign_rate = tds[8].text.strip().replace("%", "").replace("+", "").replace("-", "")
                
                data.append({
                    "date": date, 
                    "price": int(closeelt), 
                    "foreignRate": float(foreign_rate)
                })
            except Exception as e:
                pass
                
    # Sort data chronologically (oldest to newest)
    data.sort(key=lambda x: x["date"])
    
    if not data:
        raise HTTPException(status_code=404, detail="No data found or check stock code")
        
    stock_name = stock_code
    if not krx_df.empty:
        match = krx_df[krx_df['Code'] == stock_code]
        if not match.empty:
            stock_name = match.iloc[0]['Name']
            
    return {
        "code": stock_code,
        "name": stock_name,
        "data": data
    }

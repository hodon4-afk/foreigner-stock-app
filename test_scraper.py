import asyncio
import aiohttp
from bs4 import BeautifulSoup
import time

async def fetch_page(session, code, page):
    url = f"https://finance.naver.com/item/frgn.naver?code={code}&page={page}"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}
    async with session.get(url, headers=headers) as response:
        html = await response.text()
        return html

async def test_scrape():
    code = "005930" # Samsung Electronics
    pages = range(1, 64) # 63 pages * 20 days = 1260 days (approx 5 years)
    
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_page(session, code, p) for p in pages]
        htmls = await asyncio.gather(*tasks)
        
    data = []
    for html in htmls:
        soup = BeautifulSoup(html, "html.parser")
        rows = soup.select("table.type2 > tr")
        for row in rows:
            tds = row.find_all("span")
            if not tds:
               tds = row.find_all("td")
            
            # Using basic td class structure from naver finance
            tds = row.find_all("td")
            if len(tds) < 9: continue
            
            try:
                date = tds[0].text.strip()
                close = tds[1].text.strip().replace(",", "")
                foreign_rate = tds[8].text.strip().replace("%", "").replace("+", "").replace("-", "")
                
                if date and close.isdigit() and foreign_rate:
                    data.append({"date": date, "price": int(close), "foreign_rate": float(foreign_rate)})
            except Exception as e:
                pass
                
    # Sort data chronologically to use in chart
    data.sort(key=lambda x: x["date"])
    print(f"Fetched {len(data)} rows")
    if len(data) > 0:
        print("First 3:", data[:3])
        print("Last 3:", data[-3:])

if __name__ == "__main__":
    t0 = time.time()
    asyncio.run(test_scrape())
    print(f"Time taken: {time.time() - t0:.2f}s")

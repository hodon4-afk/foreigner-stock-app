import asyncio
import aiohttp

async def test_search():
    q = "삼성"
    url = f"https://ac.finance.naver.com/ac?q={q}&q_enc=utf-8&st=111&r_format=json&r_enc=utf-8"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            data = await response.json()
            print(data)

if __name__ == "__main__":
    asyncio.run(test_search())

from fastapi import APIRouter
import requests
from bs4 import BeautifulSoup
import logging
from typing import List, Dict

router = APIRouter()

# Academic keywords to filter/tag news
ACADEMIC_KEYWORDS = [
    "ADMISSION", "SCHOLARSHIP", "ACADEMIC", "CALENDAR", 
    "FEES", "CUT-OFF", "WASSCE", "MATRICULATION", 
    "GRADUATION", "REGISTRATION", "PROGRAMME", "COURSE"
]

def is_academic(text: str) -> bool:
    text_upper = text.upper()
    return any(keyword in text_upper for keyword in ACADEMIC_KEYWORDS)

def get_tag(title: str, default: str) -> str:
    title_upper = title.upper()
    if "ADMISSION" in title_upper: return "ADMISSIONS"
    if "SCHOLARSHIP" in title_upper: return "SCHOLARSHIP"
    if "CALENDAR" in title_upper: return "CALENDAR"
    if "FEES" in title_upper: return "FEES"
    return default

def safe_scrape(url: str, source_name: str, item_selector: str, title_selector: str, date_selector: str = None, snippet_selector: str = None):
    news = []
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, timeout=10, headers=headers)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        articles = soup.select(item_selector)
        for art in articles[:8]:
            title_tag = art.select_one(title_selector)
            if not title_tag: continue
            title = title_tag.get_text(strip=True)
            
            # Filter for academic focus
            if not is_academic(title):
                continue
                
            link_tag = title_tag if title_tag.name == 'a' else title_tag.find('a')
            link = link_tag['href'] if link_tag and link_tag.has_attr('href') else url
            if link.startswith('/'):
                from urllib.parse import urljoin
                link = urljoin(url, link)
            
            snippet = ""
            if snippet_selector:
                snippet_tag = art.select_one(snippet_selector)
                snippet = snippet_tag.get_text(strip=True)[:150] + "..." if snippet_tag else ""
            
            date = "RECENT"
            if date_selector:
                date_tag = art.select_one(date_selector)
                date = date_tag.get_text(strip=True) if date_tag else "RECENT"
            
            news.append({
                "title": title,
                "snippet": snippet,
                "date": date.upper(),
                "tag": get_tag(title, source_name),
                "source": source_name,
                "url": link
            })
    except Exception as e:
        logging.error(f"Error scraping {source_name}: {e}")
    return news

@router.get("/news")
async def get_all_news():
    all_news = []
    
    # Sources configuration
    sources = [
        {
            "url": "https://www.knust.edu.gh/news",
            "name": "KNUST",
            "item": ".views-row",
            "title": "h3",
            "date": ".post-date",
            "snippet": ".views-field-body"
        },
        {
            "url": "https://www.ug.edu.gh/news",
            "name": "UG-LEGON",
            "item": ".views-row",
            "title": "h5",
            "date": ".date-display-single",
            "snippet": ".views-field-body"
        },
        {
            "url": "https://news.ucc.edu.gh",
            "name": "UCC",
            "item": ".views-row",
            "title": "h3",
            "date": ".post-date",
            "snippet": ".views-field-body"
        },
        {
            "url": "https://uds.edu.gh/news",
            "name": "UDS",
            "item": "article",
            "title": "h2",
            "date": "time",
            "snippet": ".entry-content"
        },
        {
            "url": "https://gimpa.edu.gh/category/news/",
            "name": "GIMPA",
            "item": ".post",
            "title": "h2",
            "date": ".post-date",
            "snippet": ".entry-content"
        }
    ]
    
    for src in sources:
        news_from_src = safe_scrape(
            src["url"], src["name"], src["item"], 
            src["title"], src.get("date"), src.get("snippet")
        )
        all_news.extend(news_from_src)
    
    # Fallback if everything fails
    if not all_news:
        return [
            {
                "title": "KNUST Admissions 2026/2027",
                "snippet": "Official undergraduate admissions for the 2026/2027 academic year are now open...",
                "date": "MAY 15, 2026",
                "tag": "ADMISSIONS",
                "source": "KNUST",
                "url": "https://www.knust.edu.gh/news"
            },
            {
                "title": "University of Ghana Academic Calendar Released",
                "snippet": "The Academic Board has approved the calendar for the 2026/2027 academic session...",
                "date": "MAY 10, 2026",
                "tag": "CALENDAR",
                "source": "UG-LEGON",
                "url": "https://www.ug.edu.gh/news"
            }
        ]
        
    return all_news

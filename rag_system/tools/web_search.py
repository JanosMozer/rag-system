from langchain_community.tools.tavily_search import TavilySearchResults
from config.settings import TAVILY_API_KEY
import os

def get_web_search_tool():
    """
    Initializes and returns the Tavily web search tool.
    Returns None if the API key is not configured.
    """
    if not TAVILY_API_KEY:
        return None

    try:
        os.environ["TAVILY_API_KEY"] = TAVILY_API_KEY
        web_search = TavilySearchResults()
        return web_search
    except Exception as e:
        print(f"Error initializing web search tool: {e}")
        return None

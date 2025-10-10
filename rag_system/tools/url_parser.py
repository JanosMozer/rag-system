from langchain_community.document_loaders import WebBaseLoader
from langchain_core.tools import tool

@tool
def url_parser_tool(url: str) -> str:
    """
    Scrapes the content of a given URL and returns it as a single string.
    Use this tool when a user provides a URL and asks you to analyze or summarize its content.
    """
    try:
        loader = WebBaseLoader(url)
        docs = loader.load()
        content = " ".join([doc.page_content for doc in docs])
        return f"Successfully scraped content from {url}:\n\n{content}"
    except Exception as e:
        return f"Error scraping URL {url}: {e}. Please ensure the URL is valid and accessible."

def get_url_parser_tool():
    """
    Returns the URL parser tool.
    """
    return url_parser_tool

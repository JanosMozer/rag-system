from langchain_openai import ChatOpenAI

from config.settings import API_KEY, BASE_URL


def get_llm():
    """
    Initializes and returns the ChatOpenRouter LLM.
    """
    try:
        llm = ChatOpenAI(
            api_key=API_KEY,
            base_url=BASE_URL,
            model="openai/gpt-3.5-turbo"
        )
        return llm
    except Exception as e:
        print(f"Error initializing LLM: {e}")
        return None

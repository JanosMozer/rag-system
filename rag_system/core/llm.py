from langchain_openai import ChatOpenAI

from config.settings import API_KEY


def get_llm():
    """
    Initializes and returns the ChatOpenRouter LLM.
    """
    try:
        llm = ChatOpenAI(
            api_key=API_KEY,
            base_url="https://openrouter.ai/api/v1",
            model="openai/gpt-3.5-turbo"
        )
        return llm
    except Exception as e:
        print(f"Error initializing LLM: {e}")
        return None

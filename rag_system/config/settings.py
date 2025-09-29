import os
from dotenv import load_dotenv

def get_api_key():
    """
    Retrieves the OpenRouter API key.
    If .env file is not present, prompts the user for the key
    and saves it to a new .env file.
    """
    # Construct the path to the .env file
    # This assumes settings.py is in rag_system/config/
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dotenv_path = os.path.join(project_dir, '.env')

    # Load existing .env file if it exists
    if os.path.exists(dotenv_path):
        load_dotenv(dotenv_path=dotenv_path)

    # Check for the API key
    api_key = os.getenv("OPENROUTER_API_KEY")

    if not api_key:
        print("OpenRouter API key not found.")
        api_key = input("Please enter your OpenRouter API key: ")
        with open(dotenv_path, "w") as f:
            f.write(f"OPENROUTER_API_KEY={api_key}\n")
        print(".env file created and API key saved.")

    return api_key

# --- Basic Settings ---
API_KEY = get_api_key()
BASE_URL = os.getenv("OPENROUTER_BASE_URL")
CREDENTIALS_FILE = os.path.join(os.path.dirname(__file__), 'credentials.json')

# --- Data Directories ---
DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
PUBLIC_DATA_DIR = os.path.join(DATA_DIR, 'public')
WORKER_DATA_DIR = os.path.join(DATA_DIR, 'worker')
ADMIN_DATA_DIR = os.path.join(DATA_DIR, 'admin')

# --- Vector Store Settings ---
VECTOR_STORE_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'vector_store')

# --- Logging ---
LOGS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'logs')

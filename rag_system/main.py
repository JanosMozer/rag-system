import logging
import os
from datetime import datetime

from config.settings import LOGS_DIR
from core.access_control import authenticate_user
from core.embeddings import get_embedding_model
from core.retrieval import run_rag_pipeline


def setup_logging(username: str):
    """Sets up logging for a user session."""
    log_dir = LOGS_DIR
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)
        
    log_file = os.path.join(log_dir, f"{username}_history.log")
    
    logging.basicConfig(
        filename=log_file,
        level=logging.INFO,
        format='%(asctime)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )

def main():
    """Main function to run the RAG system."""
    print("--- RAG System with OpenRouter ---")

    # --- Authentication ---
    username = input("Enter username: ")
    code = input("Enter code: ")
    
    user = authenticate_user(username, code)
    
    if not user:
        print("Authentication failed. Invalid username or code.")
        return

    print(f"Welcome, {user.username}! You are logged in as {user.role}.")
    
    # --- Setup ---
    setup_logging(user.username)
    logging.info(f"User '{user.username}' logged in with role '{user.role}'.")
    
    print("Initializing embedding model...")
    embeddings = get_embedding_model()
    if not embeddings:
        print("Could not initialize embedding model. Exiting.")
        return

    print("Ready to answer your questions.")
    
    # --- Main Loop ---
    while True:
        question = input("\nAsk a question (or type 'exit' to quit): ")
        
        if question.lower() == 'exit':
            break
            
        logging.info(f"Question: {question}")
        
        print("\nThinking...")
        answer = run_rag_pipeline(user, question, embeddings)
        
        print("\nAnswer:")
        print(answer)
        logging.info(f"Answer: {answer}")

    print("Session ended. Goodbye!")
    logging.info("User logged out.")


if __name__ == "__main__":
    main()

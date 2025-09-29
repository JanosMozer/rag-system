import os
from typing import List

from langchain_community.document_loaders import TextLoader
from langchain.schema import Document

def load_documents_from_directories(dir_paths: List[str]) -> List[Document]:
    """
    Loads all .txt documents from a list of directories.
    """
    documents = []
    for dir_path in dir_paths:
        if not os.path.exists(dir_path):
            print(f"Directory not found: {dir_path}")
            continue
            
        for filename in os.listdir(dir_path):
            if filename.endswith(".txt"):
                filepath = os.path.join(dir_path, filename)
                try:
                    loader = TextLoader(filepath, encoding='utf-8')
                    documents.extend(loader.load())
                except Exception as e:
                    print(f"Error loading file {filepath}: {e}")

    return documents

import os
from typing import List, Dict, Callable

from langchain_community.document_loaders import TextLoader, CSVLoader, Docx2txtLoader
from langchain.schema import Document

# Mapping file extensions to their LangChain loader classes
LOADER_MAPPING: Dict[str, Callable] = {
    ".txt": TextLoader,
    ".csv": CSVLoader,
    ".docx": Docx2txtLoader,
}

def load_documents_from_directories(dir_paths: List[str]) -> List[Document]:
    """
    Loads documents from a list of directories, supporting multiple file types.
    """
    documents = []
    for dir_path in dir_paths:
        if not os.path.exists(dir_path):
            print(f"Directory not found: {dir_path}")
            continue
            
        for filename in os.listdir(dir_path):
            filepath = os.path.join(dir_path, filename)
            ext = "." + filename.rsplit(".", 1)[-1] if '.' in filename else None
            
            if ext in LOADER_MAPPING:
                try:
                    loader_class = LOADER_MAPPING[ext]
                    loader = loader_class(filepath)
                    documents.extend(loader.load())
                except Exception as e:
                    print(f"Error loading file {filepath}: {e}")

    return documents

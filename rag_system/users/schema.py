from dataclasses import dataclass

@dataclass
class User:
    """Represents a user of the RAG system."""
    username: str
    role: str
    code: str

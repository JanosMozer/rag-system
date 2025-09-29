from operator import itemgetter
from typing import List

from langchain.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableLambda, RunnablePassthrough

from core.llm import get_llm
from core.vectorstore import create_or_load_vectorstore
from users.schema import User
from utils.file_io import load_documents_from_directories


def _create_rag_chain(llm, retriever):
    """Creates the RAG chain."""
    template = """
    Answer the question based only on the following context:
    {context}

    Question: {question}
    """
    prompt = ChatPromptTemplate.from_template(template)

    return (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
    )

def _format_docs(docs: List) -> str:
    """Formats the retrieved documents into a string."""
    return "\n\n".join(doc.page_content for doc in docs)

def run_rag_pipeline(user: User, question: str, embeddings) -> str:
    """
    Runs the RAG pipeline for a given user and question.
    """
    accessible_dirs = get_accessible_directories(user)
    documents = load_documents_from_directories(accessible_dirs)

    if not documents:
        return "No documents accessible to the user."

    vector_store = create_or_load_vectorstore(documents, embeddings, user.role)
    retriever = vector_store.as_retriever()

    llm = get_llm()
    if not llm:
        return "LLM could not be initialized."

    rag_chain = _create_rag_chain(llm, retriever)

    try:
        response = rag_chain.invoke(question)
        return response.content
    except Exception as e:
        print(f"Error during RAG pipeline execution: {e}")
        return "An error occurred while generating the answer."

# This is needed to avoid a circular import
from core.access_control import get_accessible_directories

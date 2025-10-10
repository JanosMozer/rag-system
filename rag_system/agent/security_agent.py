from typing import List, Dict, Any, Generator

from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import AIMessage, HumanMessage

from core.llm import get_llm
from core.vectorstore import create_or_load_vectorstore
from core.embeddings import get_embedding_model
from utils.file_io import load_documents_from_directories
from platform_logic.scenario_loader import Scenario

class SecurityAgent:
    def __init__(self, scenario: Scenario):
        self.scenario = scenario
        self.chat_history = []
        
        # Initialize components once
        self.embeddings = get_embedding_model()
        self.llm = get_llm()
        
        # Load documents and create vector store based on scenario
        docs = load_documents_from_directories(scenario.initial_state.files)
        self.vector_store = create_or_load_vectorstore(docs, self.embeddings, scenario.user_role)
        self.retriever = self.vector_store.as_retriever()
        
        self._setup_rag_chain()

    def _setup_rag_chain(self):
        """Sets up the history-aware RAG chain."""
        contextualize_q_prompt = ChatPromptTemplate.from_messages([
            ("system", self.scenario.agent_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ])
        history_aware_retriever = create_history_aware_retriever(
            self.llm, self.retriever, contextualize_q_prompt
        )
        
        qa_prompt = ChatPromptTemplate.from_messages([
            ("system", "Answer the user's question based on the context provided:\n\n{context}"),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ])
        
        question_answer_chain = create_stuff_documents_chain(self.llm, qa_prompt)
        self.rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)

    def ask(self, question: str) -> Generator[Dict[str, Any], None, None]:
        """Asks a question to the RAG agent and streams the response."""
        langchain_chat_history = []
        for message in self.chat_history:
            if message["role"] == "user":
                langchain_chat_history.append(HumanMessage(content=message["content"]))
            elif message["role"] == "assistant":
                langchain_chat_history.append(AIMessage(content=message["content"]))

        stream = self.rag_chain.stream({
            "input": question,
            "chat_history": langchain_chat_history
        })
        
        full_answer = ""
        for chunk in stream:
            if "answer" in chunk:
                full_answer += chunk["answer"]
            yield chunk

        # Update chat history after the stream is complete
        self.chat_history.append({"role": "user", "content": question})
        self.chat_history.append({"role": "assistant", "content": full_answer})

# RAG System with OpenRouter

This project is a Python-based Retrieval-Augmented Generation (RAG) system that uses OpenRouter as the LLM provider. It features a modular structure and a user access control system based on roles.

## Features

- **Modular Design:** The system is organized into logical modules for configuration, data handling, core RAG components, user management, and utilities.
- **User Access Control:** Role-based access control (Admin, Worker, Guest) restricts access to different data directories.
- **OpenRouter Integration:** Leverages OpenRouter for flexible LLM integration.
- **Local Vector Store:** Uses ChromaDB for local document embedding and retrieval.
- **Automatic Configuration:** Prompts for an OpenRouter API key if not found and creates a `.env` file.
- **Interaction Logging:** Logs user interactions for monitoring and debugging.

## Project Structure

```
rag_system/
 ├── main.py
 ├── requirements.txt
 ├── config/
 │   ├── settings.py
 │   └── credentials.json
 ├── data/
 │   ├── public/
 │   ├── worker/
 │   └── admin/
 ├── core/
 │   ├── embeddings.py
 │   ├── vectorstore.py
 │   ├── llm.py
 │   ├── access_control.py
 │   └── retrieval.py
 ├── users/
 │   └── schema.py
 ├── utils/
 │   ├── file_io.py
 │   └── security.py
 └── README.md
```

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd rag-system
    ```

2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **API Key Configuration:**
    The first time you run the application, you will be prompted to enter your OpenRouter API key. It will be saved in a `.env` file in the `rag_system` directory.

4.  **User Credentials:**
    User credentials are in `rag_system/config/credentials.json`. You can modify this file to add, edit, or remove users.

## Usage

To run the system, execute the `main.py` script:

```bash
python rag_system/main.py
```

The program will prompt you for your username and code. After successful authentication, you can ask questions. The system will retrieve relevant documents based on your role's permissions and generate an answer.

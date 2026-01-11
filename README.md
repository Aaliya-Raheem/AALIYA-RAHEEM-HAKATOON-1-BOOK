
# Aaliya Raheem Physical Humanize AI Robot

A complete, production-ready AI book and RAG (Retrieval-Augmented Generation) chatbot system. This project provides a comprehensive book on Physical AI and Humanoid Robotics, coupled with an AI assistant that can answer questions based on the book's content.

## Project Overview

This project consists of three main components:

1.  **The Book**: A six-chapter book titled "Aaliya Raheem Physical Humanize AI Robot," covering fundamental concepts from an introduction to Physical AI to its future societal integration. The content is available in standard Markdown format.
2.  **RAG Chatbot Backend**: A Python-based backend powered by FastAPI that uses a real RAG pipeline. It loads the book content, generates embeddings using Google's Gemini, and answers user questions based solely on the knowledge contained within the book.
3.  **Interactive Frontend**: A clean, modern, and responsive web interface built with vanilla HTML, CSS, and JavaScript. It allows users to read the book and interact with the AI assistant in a seamless experience.

## Folder Structure

The project is organized into a clean and professional structure:

```
/
├── frontend/
│   ├── index.html       # Main application page
│   ├── style.css        # All custom styles
│   └── script.js        # Frontend logic and API interaction
│
├── backend/
│   ├── app.py           # FastAPI application and API endpoints
│   ├── rag_engine.py    # Core RAG pipeline logic
│   ├── data_loader.py   # Utility for loading book data
│   ├── requirements.txt # Python dependencies
│   └── .env.example     # Example for environment variables
│
├── data/
│   └── book/
│       ├── chapter1.md  # Source content for the RAG system
│       ├── chapter2.md
│       └── ... (6 chapters total)
│
├── docusaurus/
│   ├── docs/
│   │   ├── chapter1.md  # Mirrored content for Docusaurus site
│   │   └── ...
│   ├── docusaurus.config.js # Docusaurus site configuration
│   └── sidebars.js          # Docusaurus sidebar navigation
│
└── README.md              # This file
```

## Backend Setup

The backend is built with Python and FastAPI.

**Prerequisites**:
*   Python 3.8+
*   An API key for Google Gemini

**Instructions**:

1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2.  **Create a virtual environment** (recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install the required dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up your environment variables**:
    *   Create a file named `.env` in the `backend` directory.
    *   Copy the content from `.env.example` and add your Google Gemini API key:
      ```
      GEMINI_API_KEY="YOUR_API_KEY_HERE"
      ```

5.  **Run the application**:
    ```bash
    uvicorn app:app --reload
    ```
    The backend server will start, typically at `http://127.0.0.1:8000`. The first time it runs, it will load the book data, generate embeddings, and build the vector store in memory. This may take a moment.

## Frontend Usage

The frontend is built with pure HTML, CSS, and JavaScript and requires no build step.

**Instructions**:

1.  **Ensure the backend server is running.**
2.  **Open the `frontend/index.html` file in your web browser.**
    *   For the best experience and to avoid potential CORS issues with fetching chapter files, it is recommended to use a simple local web server (like Python's `http.server` or the "Live Server" extension in VS Code).
    *   If you have Python installed, you can run `python -m http.server` from the project's root directory and then navigate to `http://localhost:8000/frontend/` in your browser.

The interface provides chapter navigation, a reading pane, and an integrated AI chat panel to ask questions about the book.

## RAG Explanation

The AI assistant is powered by a Retrieval-Augmented Generation (RAG) system. This ensures that the assistant's answers are grounded in the provided text and prevents it from hallucinating or providing information outside the book's scope.

**The flow is as follows**:

1.  **Load & Chunk**: On startup, the backend loads the six book chapters from the `data/book` directory and splits them into smaller, manageable chunks.
2.  **Embed & Store**: Each chunk is converted into a numerical representation (an embedding) using the Gemini embeddings model. These embeddings are stored in a FAISS vector store, which is a highly efficient in-memory library for similarity search.
3.  **Retrieve**: When you ask a question, your question is also converted into an embedding. The system then performs a similarity search on the vector store to find the most relevant chunks of text from the book.
4.  **Generate**: The retrieved chunks (the "context") and your original question are passed to the Gemini language model with a specific prompt. The prompt instructs the model to answer your question *only* using the provided context.
5.  **Respond**: The answer generated by the model is sent back to the frontend and displayed in the chat.

This process ensures that the AI is a knowledgeable expert on the book's content but will refuse to answer questions on topics it hasn't read about.

## Hackathon Pitch Summary

**Project**: Aaliya Raheem Physical Humanize AI Robot - a complete and interactive learning ecosystem.

**Problem**: High-level technical knowledge on topics like AI and robotics is often locked away in dense, static PDFs or expensive textbooks. There is no interactive, engaging way for users to learn and clarify their understanding in real-time.

**Solution**: We have built not just a book, but a dynamic learning platform. Our project delivers a comprehensive, six-chapter book on Physical AI, presented in a clean, modern web interface. But the true innovation is the integrated AI assistant. Powered by a production-ready RAG pipeline and Google Gemini, our chatbot provides instant, context-aware answers grounded *exclusively* in the book's content.

**Key Features**:
*   **Expert Content**: 1500+ words per chapter on cutting-edge AI and robotics topics.
*   **Grounded AI**: A real RAG system that eliminates hallucinations and ensures trustworthy answers.
*   **Modern UI/UX**: A beautiful, responsive interface built with vanilla JS for speed and accessibility, featuring dark/light modes.
*   **Ready to Deploy**: A robust FastAPI backend and a clean, framework-free frontend. The entire system runs with just two commands.

This isn't just a book; it's a conversation with an expert. It's the future of learning.
"# Aaliya-raheem-hackathon-1-book-or-rag-chatbot-" 

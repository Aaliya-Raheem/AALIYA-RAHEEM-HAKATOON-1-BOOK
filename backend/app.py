
import os
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import str

from rag_engine import RAGEngine

# --- Pydantic Models ---
class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    answer: str
    sources: list

# --- FastAPI App ---
app = FastAPI(
    title="Aaliya Raheem Physical Humanize AI Robot - RAG API",
    description="API for the RAG chatbot powered by Gemini and FAISS.",
    version="1.0.0"
)

# --- CORS Middleware ---
# Allows the frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to the frontend's domain
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# --- RAG Engine Initialization ---
# The engine is initialized once when the application starts.
# This avoids reloading the model and data for every request.
rag_engine = None

@app.on_event("startup")
def startup_event():
    """
    On startup, initialize the RAG engine.
    """
    global rag_engine
    # The path to the data is relative to the root of the project
    data_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'book')
    
    if not os.path.exists(data_path):
        # This is a critical error, the app cannot function without the data
        raise RuntimeError(f"Data directory not found at: {data_path}. The application cannot start.")
        
    try:
        print("Initializing RAG Engine on startup...")
        rag_engine = RAGEngine(data_path=data_path)
        rag_engine.setup()
        print("RAG Engine initialized successfully.")
    except Exception as e:
        # Log the error and prevent the app from starting if the engine fails
        print(f"FATAL: RAG Engine failed to initialize: {e}")
        # In a real production environment, you might want to handle this more gracefully
        # or have a monitoring system alert you. For this project, a crash on startup is clear.
        raise e

# --- API Endpoints ---
@app.get("/", summary="Root endpoint", description="A simple hello world endpoint to check if the API is running.")
async def read_root():
    return {"message": "Welcome to the Aaliya Raheem RAG API. The engine is running. Use the /chat endpoint to ask questions."}

@app.post("/chat", response_model=ChatResponse, summary="Chat with the RAG model", description="Send a question and get an answer based on the book content.")
async def chat_with_rag(request: ChatRequest = Body(...)):
    """
    Handles the chat request, gets an answer from the RAG engine, and returns it.
    """
    if not rag_engine:
        raise HTTPException(status_code=503, detail="RAG Engine is not available or has not been initialized.")
    
    if not request.question:
        raise HTTPException(status_code=400, detail="Question cannot be empty.")

    try:
        result = rag_engine.ask(request.question)
        return ChatResponse(**result)
    except Exception as e:
        # Catch potential errors during the ask process
        print(f"An error occurred in the /chat endpoint: {e}")
        raise HTTPException(status_code=500, detail="An internal error occurred while processing the question.")

# --- Main block for running with uvicorn ---
if __name__ == "__main__":
    import uvicorn
    # This allows running the app directly for testing
    # e.g., python backend/app.py
    # However, the official command is `uvicorn backend.app:app --reload`
    print("Starting Uvicorn server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)

import os
from dotenv import load_dotenv

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.vectorstores.faiss import FAISS
from langchain.chains.retrieval_qa import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.schema.document import Document
from typing import List

from data_loader import load_documents

class RAGEngine:
    """
    This class encapsulates the entire Retrieval-Augmented Generation (RAG) pipeline.
    """
    def __init__(self, data_path: str):
        """
        Initializes the RAG engine.

        Args:
            data_path (str): The path to the directory containing the source documents.
        """
        load_dotenv()
        self._validate_api_key()

        self.data_path = data_path
        self.vector_store = None
        self.qa_chain = None

        # Initialize core components
        self.text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        self.embeddings_model = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        self.llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3, convert_system_message_to_human=True)
        
        # Define the prompt template for the QA chain
        self.prompt_template = """
        Use the following pieces of context to answer the question at the end. 
        If you don't know the answer from the provided context, just say that you don't know. 
        Do not try to make up an answer. Provide a concise and helpful answer based ONLY on the book content.

        Context:
        {context}

        Question:
        {question}

        Answer:
        """
        self.prompt = PromptTemplate(template=self.prompt_template, input_variables=["context", "question"])

    def _validate_api_key(self):
        """Checks if the Gemini API key is available."""
        if not os.getenv("GEMINI_API_KEY"):
            raise ValueError("GEMINI_API_KEY not found in environment variables. Please set it in the .env file.")

    def setup(self):
        """
        Loads documents, splits them, generates embeddings, and builds the vector store and QA chain.
        """
        print("Setting up the RAG engine...")
        
        # 1. Load documents
        print(f"Loading documents from {self.data_path}...")
        documents = load_documents(self.data_path)
        if not documents:
            raise RuntimeError("No documents were loaded. Cannot proceed with setup.")
        print(f"Loaded {len(documents)} documents.")

        # 2. Split documents into chunks
        print("Splitting documents into chunks...")
        chunks = self.text_splitter.split_documents(documents)
        if not chunks:
            raise RuntimeError("Document splitting resulted in no chunks. Cannot proceed.")
        print(f"Created {len(chunks)} chunks.")

        # 3. Create and build the FAISS vector store in memory
        print("Generating embeddings and building the vector store...")
        try:
            self.vector_store = FAISS.from_documents(chunks, self.embeddings_model)
            print("Vector store created successfully.")
        except Exception as e:
            raise RuntimeError(f"Failed to create vector store: {e}")

        # 4. Create the QA chain
        print("Creating the QA chain...")
        retriever = self.vector_store.as_retriever(search_kwargs={"k": 3})
        self.qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=retriever,
            chain_type_kwargs={"prompt": self.prompt},
            return_source_documents=True
        )
        print("RAG engine setup is complete and ready.")

    def ask(self, question: str) -> dict:
        """
        Asks a question to the RAG system.

        Args:
            question (str): The user's question.

        Returns:
            dict: A dictionary containing the answer and source documents.
        """
        if not self.qa_chain:
            raise RuntimeError("The QA chain is not initialized. Please run the setup() method first.")
        
        print(f"Received question: {question}")
        try:
            result = self.qa_chain({"query": question})
            # Clean up the source documents for a cleaner response
            sources = [
                {
                    "source": os.path.basename(doc.metadata.get("source", "Unknown")),
                    "content": doc.page_content[:200] + "..." # Preview of the source content
                } 
                for doc in result.get("source_documents", [])
            ]
            
            return {
                "answer": result.get("result", "Sorry, I could not find an answer."),
                "sources": sources
            }
        except Exception as e:
            print(f"Error during question answering: {e}")
            return {
                "answer": "An error occurred while processing your question.",
                "sources": []
            }


if __name__ == '__main__':
    # This is for testing the RAG engine independently
    data_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'book')
    
    try:
        engine = RAGEngine(data_path=data_dir)
        engine.setup()
        
        print("\n--- Testing RAG Engine ---")
        
        test_question_1 = "What is Physical AI?"
        print(f"\nQ: {test_question_1}")
        response_1 = engine.ask(test_question_1)
        print(f"A: {response_1['answer']}")
        print(f"Sources: {response_1['sources']}")

        test_question_2 = "What is the Asimov Fallacy?"
        print(f"\nQ: {test_question_2}")
        response_2 = engine.ask(test_question_2)
        print(f"A: {response_2['answer']}")
        print(f"Sources: {response_2['sources']}")

        test_question_3 = "What is the capital of France?" # Out of scope
        print(f"\nQ: {test_question_3}")
        response_3 = engine.ask(test_question_3)
        print(f"A: {response_3['answer']}")

    except (ValueError, RuntimeError) as e:
        print(f"\nAn error occurred during setup or testing: {e}")
    except Exception as e:
        print(f"\nAn unexpected error occurred: {e}")

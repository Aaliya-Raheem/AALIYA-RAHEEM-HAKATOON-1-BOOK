import os
from langchain_community.document_loaders import UnstructuredMarkdownLoader
from typing import List
from langchain.schema.document import Document

def load_documents(data_path: str) -> List[Document]:
    """
    Loads all markdown files from a given directory.

    Args:
        data_path (str): The path to the directory containing the markdown files.

    Returns:
        List[Document]: A list of loaded documents.
    """
    if not os.path.isdir(data_path):
        raise ValueError(f"Provided data path '{data_path}' is not a directory.")

    documents = []
    for filename in os.listdir(data_path):
        if filename.endswith(".md"):
            file_path = os.path.join(data_path, filename)
            try:
                loader = UnstructuredMarkdownLoader(file_path)
                documents.extend(loader.load())
            except Exception as e:
                print(f"Error loading file {file_path}: {e}")
    
    return documents

if __name__ == '__main__':
    # This is for testing the loader independently
    # Note: The root for the data path is the project's root directory
    data_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'book')
    
    print(f"Attempting to load documents from: {data_directory}")

    if not os.path.exists(data_directory):
        print("Error: Data directory does not exist.")
    else:
        try:
            docs = load_documents(data_directory)
            if docs:
                print(f"Successfully loaded {len(docs)} documents.")
                # Print some info about the first document
                print("\n--- Sample Document ---")
                print(f"Source: {docs[0].metadata.get('source')}")
                print(f"Content length: {len(docs[0].page_content)}")
                print("-----------------------\n")
            else:
                print("No documents were loaded. Check the directory and file extensions.")
        except ValueError as ve:
            print(f"Error: {ve}")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")

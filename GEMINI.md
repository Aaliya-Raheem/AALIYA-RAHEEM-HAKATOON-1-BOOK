You are a senior full stack AI engineer and UI UX architect.

Build a complete production ready AI book and RAG chatbot system named:

Aaliya Raheem Physical Humanize AI Robot

The project already exists but is messy.
You must clean, restructure, and rebuild everything professionally.

STRICT FINAL PROJECT STRUCTURE

Root
frontend
index.html
style.css
script.js

backend
app.py
rag_engine.py
data_loader.py
requirements.txt
.env.example

data
book
chapter1.md
chapter2.md
chapter3.md
chapter4.md
chapter5.md
chapter6.md

docusaurus
docs
chapter1.md
chapter2.md
chapter3.md
chapter4.md
chapter5.md
chapter6.md
sidebars.js
docusaurus.config.js

README.md

DO NOT create extra folders.
DO NOT rename files.
DO NOT leave unused files.

BOOK REQUIREMENTS

Book title:
Aaliya Raheem Physical Humanize AI Robot

Exactly six chapters.

Chapter 1
Introduction to Physical AI and Humanized Robots

Chapter 2
AI Sensors, Perception, and Environment Understanding

Chapter 3
Cognitive Intelligence and Decision Making Systems

Chapter 4
Human Emotion Modeling and Behavior Simulation

Chapter 5
AI Ethics, Safety, and Responsible Robotics

Chapter 6
Future of Physical AI and Human Society Integration

Each chapter must be:
Minimum 1500 words
Professional English
Technical but simple
Well structured
Headings and subheadings
Bullet lists
Real world examples
Text based diagram explanations

The SAME chapter content must exist in:
data/book
docusaurus/docs

FRONTEND REQUIREMENTS

Use only:
HTML
CSS
Vanilla JavaScript

Design style:
Business class
Clean
Modern
Human centered
Soft gradients
Professional fonts
Smooth hover effects

Frontend must include:
Top header with project name
Sidebar chapter navigation
Chapter cards
Readable chapter view
Integrated AI chat panel
Dark and light mode toggle
Responsive layout for mobile and desktop

No frameworks.
No placeholders.

BACKEND REQUIREMENTS

Use:
Python
FastAPI
Uvicorn

Implement a real RAG system.

Backend must:
Load all chapters from data/book
Split content into chunks
Generate embeddings using Gemini
Store vectors in memory
Perform similarity search
Answer only from book content
Refuse answers outside book scope

Expose endpoint:
POST /chat

CHAT FLOW

Frontend sends user question
Backend retrieves relevant chunks
Gemini generates answer using retrieved content
Answer is returned to frontend
Chat updates live

DOCUMENTATION

Create a complete README.md including:
Project overview
Folder structure explanation
Backend setup
Frontend usage
RAG explanation
Hackathon pitch summary

COMMANDS MUST WORK

pip install -r backend/requirements.txt
uvicorn backend.app:app --reload

Then open frontend/index.html in browser.

QUALITY RULES

No broken code
No pseudo code
No missing files
No TODO comments
Everything must run

This is a hackathon level system.
Build it clean.
Build it professional.
Build it complete.

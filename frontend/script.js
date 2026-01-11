
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const chapterNav = document.getElementById('chapter-nav');
    const bookContent = document.getElementById('book-content');
    const themeToggle = document.getElementById('theme-toggle');
    
    // Chat Panel Elements
    const chatPanel = document.querySelector('.chat-panel');
    const openChatButton = document.getElementById('open-chat-button');
    const toggleChatPanelButton = document.getElementById('toggle-chat-panel');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendButton = document.getElementById('chat-send-button');
    const chatSpinner = document.getElementById('chat-spinner');

    // --- State ---
    const chapters = [
        { id: 1, title: 'Introduction to Physical AI and Humanized Robots' },
        { id: 2, title: 'AI Sensors, Perception, and Environment Understanding' },
        { id: 3, title: 'Cognitive Intelligence and Decision Making Systems' },
        { id: 4, title: 'Human Emotion Modeling and Behavior Simulation' },
        { id: 5, title: 'AI Ethics, Safety, and Responsible Robotics' },
        { id: 6, title: 'Future of Physical AI and Human Society Integration' },
    ];
    const backendUrl = 'http://127.0.0.1:8000';

    // --- Initialization ---
    const init = () => {
        setupTheme();
        populateChapterNav();
        displayChapterCards();
        setupEventListeners();
    };

    // --- Theme Management ---
    const setupTheme = () => {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        }
    };

    const handleThemeToggle = () => {
        if (themeToggle.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    };

    // --- Chapter Loading & Display ---
    const populateChapterNav = () => {
        if (!chapterNav) return;
        
        const homeLink = document.createElement('a');
        homeLink.href = '#';
        homeLink.textContent = 'Home';
        homeLink.dataset.target = 'home';
        homeLink.classList.add('active');
        chapterNav.appendChild(homeLink);

        chapters.forEach(chapter => {
            const link = document.createElement('a');
            link.href = `#chapter-${chapter.id}`;
            link.textContent = `Chapter ${chapter.id}: ${chapter.title}`;
            link.dataset.chapterId = chapter.id;
            chapterNav.appendChild(link);
        });
    };

    const displayChapterCards = () => {
        bookContent.innerHTML = '';
        const container = document.createElement('div');
        container.className = 'chapter-cards-container';
        
        chapters.forEach(chapter => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.chapterId = chapter.id;
            card.innerHTML = `
                <h3>Chapter ${chapter.id}</h3>
                <p>${chapter.title}</p>
            `;
            container.appendChild(card);
        });
        bookContent.appendChild(container);

        // Add event listeners to new cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => loadChapterContent(card.dataset.chapterId));
        });
    };

    const loadChapterContent = async (chapterId) => {
        try {
            // Note: This relies on the final project structure where `data` is at the same level as `frontend`.
            // This might require a local server to work due to CORS policy if opening as file://
            const response = await fetch(`../data/book/chapter${chapterId}.md`);
            if (!response.ok) {
                throw new Error(`Could not fetch chapter ${chapterId}. Status: ${response.status}`);
            }
            const markdown = await response.text();
            
            // Basic Markdown to HTML conversion
            const html = parseMarkdown(markdown);
            
            bookContent.innerHTML = `<div class="chapter-view">${html}</div>`;
            updateActiveNavLink(chapterId);
            bookContent.scrollTop = 0; // Scroll to top of content
        } catch (error) {
            console.error('Error loading chapter:', error);
            bookContent.innerHTML = `<p class="error">Failed to load chapter. Please ensure you are running this from a local server.</p>`;
        }
    };
    
    // --- Simple Markdown Parser ---
    // This is a basic parser. For a real app, a library like Marked.js would be better.
    const parseMarkdown = (text) => {
        return text
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>') // Basic lists, needs improvement for multi-line
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/`([^`]+)`/gim, '<code>$1</code>')
            .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
            .replace(/\n/g, '<br>'); // Simple newline handling
    };


    const updateActiveNavLink = (chapterId) => {
        document.querySelectorAll('#chapter-nav a').forEach(a => {
            a.classList.remove('active');
            if (a.dataset.chapterId === chapterId) {
                a.classList.add('active');
            } else if (!chapterId && a.dataset.target === 'home') {
                a.classList.add('active');
            }
        });
    };
    
    // --- Chat Functionality ---
    const toggleChatPanel = () => {
        chatPanel.classList.toggle('open');
    };

    const handleChatSend = async () => {
        const question = chatInput.value.trim();
        if (!question) return;

        appendMessage(question, 'user');
        chatInput.value = '';
        chatSpinner.style.display = 'block';

        try {
            const response = await fetch(`${backendUrl}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            appendMessage(data.answer, 'assistant', data.sources);
        } catch (error) {
            console.error('Chat API error:', error);
            appendMessage(`Sorry, I couldn't connect to the AI assistant. Please ensure the backend is running and reachable at ${backendUrl}. Error: ${error.message}`, 'error');
        } finally {
            chatSpinner.style.display = 'none';
        }
    };

    const appendMessage = (text, type, sources = []) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        
        let content = `<p>${text.replace(/\n/g, '<br>')}</p>`;

        if (sources.length > 0) {
            content += `<div class="sources"><h4>Sources:</h4>`;
            sources.forEach(source => {
                content += `<div class="source" title="${source.content}">${source.source}</div>`;
            });
            content += `</div>`;
        }
        
        messageDiv.innerHTML = content;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };


    // --- Event Listeners ---
    const setupEventListeners = () => {
        themeToggle.addEventListener('change', handleThemeToggle);

        openChatButton.addEventListener('click', toggleChatPanel);
        toggleChatPanelButton.addEventListener('click', toggleChatPanel);

        chatSendButton.addEventListener('click', handleChatSend);
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleChatSend();
            }
        });
        
        chapterNav.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.closest('a');
            if (!target) return;

            if (target.dataset.target === 'home') {
                displayChapterCards();
                updateActiveNavLink(null);
            } else if (target.dataset.chapterId) {
                loadChapterContent(target.dataset.chapterId);
            }
        });
    };

    // --- Run Application ---
    init();
});

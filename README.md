TN Colleges — AI Chat Assistant

An AI-powered chat application for exploring Tamil Nadu engineering colleges.

The application allows users to ask questions about colleges and receive AI-generated responses through the TN Colleges RAG system.

Features

AI-powered college assistant

Ask questions about Tamil Nadu engineering colleges

Suggested questions

Persistent chat history

Search chat history

Rename chats

Delete chats

Pin chats

Regenerate AI responses

Google Sign-In

User profile

Account Settings

User-specific chat history

Secure chat storage with Supabase

Restore the active conversation after refresh or browser-tab switching

Tech Stack

React

Vite

Tailwind CSS

Supabase

Lucide React

React Icons

Setup

1. Clone the repository

git clone <your-repository-url>
cd chat-ui

2. Install dependencies

npm install

3. Configure environment variables

Create a .env file in the project root:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

Do not commit the .env file to Git.

4. Start the development server

npm run dev

Open the local URL shown in the terminal.

Authentication

The application uses Supabase Authentication with Google Sign-In.

Make sure Google OAuth is configured in your Supabase project before using Google Sign-In.

Chat Storage

Chat history is stored securely in Supabase and associated with the authenticated user's account.

Users can only access their own chats.

The currently active chat is also restored after a page refresh or returning to the browser tab.

Project Structure

src/
├── components/
│   ├── Header.jsx
│   ├── InputBar.jsx
│   ├── Login.jsx
│   ├── MessageArea.jsx
│   └── Sidebar.jsx
├── services/
│   ├── chatService.js
│   └── supabase.js
└── App.jsx

Environment Variables

The application expects the following variables:

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

Keep these values in your local .env file.


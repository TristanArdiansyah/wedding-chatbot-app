"use client";
import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import ChatContainer from './components/ChatContainer';

export interface ChatMessage {
  query: string;
  reply: string;
}

export default function Home() {
  // Initialize chatHistory with a static introduction message from the bot.
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      query: '',
      reply: 'Hello! How can I help you with the wedding info today?'
    }
  ]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Ref for auto-resizing textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle auto-resize
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('https://api.ramarried.biomadev.my.id/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, chat_history: chatHistory })
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setChatHistory((prev) => [...prev, { query, reply: data.response }]);
      setQuery('');
    } catch (error) {
      console.error('Error calling API:', error);
      setChatHistory((prev) => [
        ...prev,
        {
          query: query,
          reply:
            'We are currently performing maintenance. Please try again later.'
        }
      ]);
    } finally {
      setLoading(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center">
      {/* Background image (desktop only) */}
      <div
        className="
          absolute inset-0
          bg-cover bg-center bg-no-repeat blur-sm
        "
        style={{ backgroundImage: "url('/images/bg.jpeg')" }}
      />

      {/* Outer container with margin & rounded corners */}
      <div
        className="
          relative max-w-md
          flex flex-col
          p-4
          pt-10
          bg-[#FFFCF6]
          m-4
          rounded-lg
        "
        style={{ height: 'calc(100vh - 2rem)' }}
      >
        <div className="container flex d-flex justify-center">
          <img src="/images/ryan.png" alt="shape" height={10} width={100} />
          <span className="p-5"></span>
          <img src="/images/yasmin.png" alt="shape" height={10} width={100} />
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">
          Ask about the Wedding!
        </h1>

        {/* Scrollable chat container */}
        <div className="flex-auto overflow-y-auto mb-2">
          <ChatContainer chatHistory={chatHistory} />
        </div>

        {/* Template slider */}
        <div className="shrink-0">
          <TemplateSlider setQuery={setQuery} />
        </div>

        {/* Form at bottom */}
        <form
          onSubmit={handleSubmit}
          className="shrink-0 mt-2 flex items-end gap-2"
        >
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Enter your query"
            value={query}
            onChange={handleTextareaChange}
            className="
              flex-grow
              rounded-md
              border
              border-[#335F70]
              px-4
              py-2
              focus:outline-none
              focus:ring-2
              focus:ring-[#335F70]
              resize-none
              overflow-hidden
              leading-tight
              break-words
              whitespace-pre-wrap
            "
            style={{ maxHeight: '10rem' }}
          />

          <button
            type="submit"
            disabled={loading}
            className="
              bg-[#DBB479] text-black 
              rounded-full px-4 py-2
              hover:bg-[#c7a269] disabled:bg-gray-400
              transition-transform transform-gpu
              hover:scale-105 active:scale-95
              flex items-center justify-center
            "
          >
            {loading ? (
              <>
                {/* Tailwind Spinner */}
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              'Send'
            )}
          </button>
        </form>
        <img
          src="/images/section-divider.png"
          alt="shape"
          className="pt-4"
        />
      </div>
    </main>
  );
}

/** TemplateSlider for prefilled queries */
function TemplateSlider({ setQuery }: { setQuery: (value: string) => void }) {
  const templates = [
    {
      label: 'Google Calendar',
      text: `Give me the google calendar link.`
    },
    {
      label: 'About Yasmin',
      text: `I would like to know about Yasmin.`
    },
    {
      label: 'About Ryan',
      text: `I would like to know about Ryan.`
    },
    {
      label: 'About Couple',
      text: `Tell me the couple's story.`
    },
    {
      label: 'Navigate to Venue',
      text: `How can i navigate to the venue?`
    },
    {
      label: 'About Reception',
      text: `When and where is the wedding reception?`
    },
    {
      label: 'About RSVP',
      text: `I want to RSVP.`
    },
    {
      label: 'Gift Recommendation',
      text: `Recommend me gifts for the couple.`
    },
    {
      label: 'Reception Food',
      text: `What kind of food is available?`
    },
    {
      label: 'Dress Code',
      text: `Give me the dress code for the wedding.`
    },
    {
      label: 'Digital Wallet',
      text: `Where can i send money as wedding gift?.`
    },
  ];

  return (
    <div className="flex overflow-x-auto space-x-4 py-2">
      {templates.map((template, index) => (
        <button
          key={index}
          onClick={() => setQuery(template.text)}
          className="
            flex-shrink-0 
            px-4 py-2 
            rounded-full 
            bg-yellow-100
            hover:bg-yellow-300
            text-gray-800
            transition
          "
        >
          {template.label}
        </button>
      ))}
    </div>
  );
}

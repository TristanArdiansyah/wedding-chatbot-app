"use client";
import React from 'react';

interface ChatFormProps {
  query: string;
  setQuery: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

export default function ChatForm({
  query,
  setQuery,
  handleSubmit,
  loading
}: ChatFormProps) {
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-auto">
      <input
        type="text"
        placeholder="Enter your query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          flex-grow rounded-full border border-[#335F70] 
          px-4 py-2 
          focus:outline-none focus:ring-2 focus:ring-[#335F70]
        "
      />
      <button
        type="submit"
        disabled={loading}
        className="
          bg-[#DBB479] text-black 
          rounded-full px-4 py-2 
          hover:bg-[#c7a269] disabled:bg-gray-400 
          transition-colors
        "
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}

"use client";
import React from 'react';
import { ChatMessage } from '../page';
import ChatBubble from './ChatBubble';

interface ChatContainerProps {
  chatHistory: ChatMessage[];
}

export default function ChatContainer({ chatHistory }: ChatContainerProps) {
  return (
    <div className="flex-grow overflow-y-auto rounded p-4 mb-4">

      <div className="flex flex-col gap-3">
        {chatHistory.map((chat, index) => (
          <div key={index} className="flex flex-col gap-2">
            {chat.query.trim() !== "" && (
              <div className="self-end max-w-[80%] bg-[#DBB479] text-black rounded-tl-2xl rounded-br-2xl px-4 py-2 animate-fadeIn break-words">
                {chat.query}
              </div>
            )}
            {chat.reply.trim() !== "" && (
              <div className="self-start max-w-[80%] bg-[#335F70] text-white rounded-tr-2xl rounded-bl-2xl px-4 py-2 animate-fadeIn break-words">
                <ChatBubble text={chat.reply} typingSpeed={10} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

  );
}

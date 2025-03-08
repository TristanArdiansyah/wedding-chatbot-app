"use client";
import React, { useState, useEffect } from 'react';

interface ChatBubbleProps {
  text: string;
  typingSpeed?: number;
}

export default function ChatBubble({ text, typingSpeed = 70 }: ChatBubbleProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      i++;
      setDisplayedText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(intervalId);
      }
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [text, typingSpeed]);

  return <>{displayedText}</>;
}

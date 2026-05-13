"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error: Could not connect to the AI agent." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <div className="flex flex-col w-full max-w-4xl mx-auto h-full p-4 md:p-6">
        <header className="flex items-center justify-between py-4 border-b border-zinc-200 dark:border-zinc-700">
          <h1 className="text-2xl font-bold tracking-tight">AI Agent</h1>
          <div className="text-sm text-zinc-500">Ready to help</div>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto py-6 space-y-4 scroll-smooth"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
              <div className="p-4 rounded-full bg-zinc-200 dark:bg-zinc-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M12 16v4"/><path d="M10 16h4"/></svg>
              </div>
              <p className="text-lg">Hello! I am your AI Agent. How can I help you today?</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                }`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-200 dark:bg-zinc-800 px-4 py-2 rounded-2xl">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.1s]"></span>
                  <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={sendMessage} className="mt-4 flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-3 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
          </button>
        </form>
      </div>
    </div>
  );
}

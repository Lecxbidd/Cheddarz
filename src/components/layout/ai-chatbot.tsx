"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { MessageCircle, RotateCcw, Send, Sparkles, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  recommendations?: Array<{
    name: string;
    slug: string;
    price: number;
    category: string;
    reason: string;
  }>;
  followUps?: string[];
  supportLinks?: Array<{
    label: string;
    href: string;
  }>;
};

export function AiChatbot() {
  const starterMessage = useMemo<ChatMessage>(
    () => ({
      role: "assistant",
      content:
        "Hi, I am your Cheddar Apparel AI assistant. I can answer store questions and general questions too. Tell me your style, budget, and size for product recommendations.",
    }),
    []
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([starterMessage]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cheddarz-chat-history");
      if (!saved) return;
      const parsed = JSON.parse(saved) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(parsed.slice(-30));
      }
    } catch {
      // no-op
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cheddarz-chat-history", JSON.stringify(messages.slice(-30)));
    } catch {
      // no-op
    }
  }, [messages]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json()) as {
        reply?: string;
        recommendations?: ChatMessage["recommendations"];
        followUps?: string[];
        supportLinks?: ChatMessage["supportLinks"];
      };
      const reply =
        data.reply ??
        "I could not process that right now. Please try again in a moment.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
          recommendations: data.recommendations ?? [],
          followUps: data.followUps ?? [],
          supportLinks: data.supportLinks ?? [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network issue. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function startNewChat() {
    setMessages([starterMessage]);
    setInput("");
  }

  function fillPrompt(text: string) {
    setInput(text);
    setIsOpen(true);
  }

  function sendFollowUp(text: string) {
    setInput(text);
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      {isOpen ? (
        <div className="flex h-[520px] w-[min(94vw,380px)] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div>
              <p className="text-sm font-semibold">AI Stylist Assistant</p>
              <p className="text-xs text-muted-foreground">Store + general AI support</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={startNewChat}
                className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                aria-label="New chat"
                title="New chat"
              >
                <RotateCcw className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                aria-label="Close chat"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-b px-3 py-2">
            <button
              type="button"
              onClick={() => fillPrompt("Recommend 5 outfits under $80 for ladies.")}
              className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground hover:bg-muted"
            >
              Ladies under $80
            </button>
            <button
              type="button"
              onClick={() => fillPrompt("I need men's formal wear for an event.")}
              className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground hover:bg-muted"
            >
              Men's formal
            </button>
            <button
              type="button"
              onClick={() => fillPrompt("Best kids wear for weekend outing?")}
              className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground hover:bg-muted"
            >
              Kids weekend picks
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className="space-y-2">
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "assistant" && message.recommendations?.length ? (
                  <div className="ml-1 space-y-2">
                    {message.recommendations.map((item) => (
                      <a
                        key={`${item.slug}-${item.name}`}
                        href={`/products/${item.slug}`}
                        className="block rounded-xl border bg-card px-3 py-2 text-xs transition hover:border-primary/40"
                      >
                        <p className="font-medium">{item.name}</p>
                        <p className="mt-0.5 text-muted-foreground">
                          ${item.price.toFixed(2)} · {item.category}
                        </p>
                        <p className="mt-1 text-muted-foreground">{item.reason}</p>
                      </a>
                    ))}
                  </div>
                ) : null}
                {message.role === "assistant" && message.followUps?.length ? (
                  <div className="ml-1 flex flex-wrap gap-2">
                    {message.followUps.map((followUp) => (
                      <button
                        key={followUp}
                        type="button"
                        onClick={() => sendFollowUp(followUp)}
                        className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground hover:bg-muted"
                      >
                        {followUp}
                      </button>
                    ))}
                  </div>
                ) : null}
                {message.role === "assistant" && message.supportLinks?.length ? (
                  <div className="ml-1 flex flex-wrap gap-2">
                    {message.supportLinks.map((link) => (
                      <a
                        key={`${link.href}-${link.label}`}
                        href={link.href}
                        className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground transition hover:bg-muted"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {isLoading ? (
              <div className="max-w-[85%] rounded-2xl bg-muted px-3 py-2 text-sm text-muted-foreground">
                Thinking...
              </div>
            ) : null}
          </div>

          <form onSubmit={onSubmit} className="border-t p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask anything: products, sizing, delivery, or general questions..."
                className="h-10 flex-1 rounded-xl border bg-background px-3 text-sm outline-none ring-primary/30 transition focus:ring"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Send message"
              >
                <Send className="size-4" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg transition hover:opacity-90"
        >
          <Sparkles className="size-4" />
          AI Stylist
        </button>
      )}
    </div>
  );
}


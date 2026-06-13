import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Phone, ArrowUpRight, HelpCircle, Dumbbell } from "lucide-react";
import { ChatMessage } from "../types";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "assistant",
      text: "Welcome to MyEverFit! I am EverAI, your virtual fitness advisor. I can break down our coaching philosophies, explain our 1-on-1 private gym packages, outline online metabolic planning, or help you secure a Free Technical Consultation! How can I fuel your journey today?",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "What training packages are available?",
    "How does 1-on-1 coaching work?",
    "Do you offer macro/meal guidance?",
    "Can you help me schedule a call?",
  ];

  // Auto-scroll chats
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: `m-user-${Date.now()}`,
      role: "user",
      text: textToSend,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Map history to standard chat payload
      // Select last 6 messages to keep context window tight and fast
      const recentHistory = [...messages, userMessage]
        .slice(-6)
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: recentHistory }),
      });

      const data = await res.json();
      
      const assistantMessage: ChatMessage = {
        id: `m-ast-${Date.now()}`,
        role: "assistant",
        text: data.text || "I was unable to synchronize with my primary nodes at the moment. However, please reach our head coach directly via voice line (562) 440-0707 anytime to chat!",
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chatbot query failed:", err);
      const errorMessage: ChatMessage = {
        id: `m-err-${Date.now()}`,
        role: "assistant",
        text: "My neural matrix is currently operating on backup limits. Let's schedule a physical call instead! Reach us directly at (562) 440-0707, or complete the booking queue on this page.",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <>
      {/* Floating Messenger Toggle Button */}
      <button
        id="chatbot-trigger-fab"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-neon-green hover:bg-neon-green/90 text-black shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center border border-white/20 group"
        aria-label="Toggle virtual fitness AI trainer"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform rotate-90" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-ping" />
          </div>
        )}
      </button>

      {/* Floating Chat Panel */}
      {isOpen && (
        <div
          id="chatbot-floating-window"
          className="fixed bottom-24 right-6 z-50 w-[92vw] sm:w-[400px] h-[480px] sm:h-[550px] max-h-[calc(100vh-120px)] rounded-2xl glass-panel border border-neon-green/20 shadow-2xl flex flex-col justify-between overflow-hidden animate-[waveEntrance_0.3s_ease-out]"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-[#12181F]/90 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center text-neon-green">
                <Dumbbell className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-display font-semibold text-white tracking-tight text-sm">
                    EverAI Trainer
                  </h4>
                  <span className="w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-[pulse_1s_infinite]" />
                </div>
                <span className="text-[10px] font-mono font-medium text-gray-500 uppercase tracking-widest block">
                  Interactive AI Agent
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#0A0F14]/40 scrollbar-none">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col max-w-[85%] ${
                  m.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                    m.role === "user"
                      ? "bg-neon-green text-black font-medium rounded-tr-none shadow-[0_4px_15px_rgba(57,255,20,0.15)]"
                      : "bg-[#12181F]/90 border border-white/5 text-gray-200 rounded-tl-none"
                  }`}
                >
                  {m.text.split("\n\n").map((para, idx) => (
                    <p key={idx} className={idx > 0 ? "mt-2" : ""}>
                      {para.startsWith("-") ? (
                        <span className="block pl-3 border-l border-neon-green/40">
                          {para}
                        </span>
                      ) : (
                        para
                      )}
                    </p>
                  ))}
                </div>
                <span className="text-[9px] font-mono text-gray-600 mt-1 uppercase tracking-wider">
                  {m.role === "user" ? "YOU" : "EVERAI COACH"}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start mr-auto max-w-[80%] animate-pulse">
                <div className="px-4 py-3 rounded-2xl bg-[#12181F]/95 border border-white/5 text-gray-400 text-xs rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick suggestions panel */}
          {messages.length === 1 && !isTyping && (
            <div className="px-5 py-3 border-t border-white/5 bg-[#0D1219]/60">
              <span className="text-[9px] font-mono font-bold text-neon-green/80 uppercase block mb-2 tracking-widest">
                SUGGESTED DISCUSSIONS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSendMessage(p)}
                    className="text-[10px] bg-[#12181F] hover:bg-[#1C2530] text-gray-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/5 transition-all text-left"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Inputs */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-[#12181F]/90 border-t border-white/5 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask EverAI coaching details..."
              className="flex-1 bg-[#0A0F14]/80 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-all"
            />
            <button
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              className="p-2.5 rounded-xl bg-neon-green hover:bg-neon-green/90 text-black transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center shadow-lg cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes waveEntrance {
          from { opacity: 0; transform: translateY(15px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}

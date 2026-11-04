"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
}

export default function SmartChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "أهلاً بك في منصة سَنَد! أنا المساعد الذكي، كيف يمكنني مساعدتك في اختيار أفضل المنتجات لعائلتك في دمشق وريفها؟",
      sender: "bot",
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // التمرير التلقائي لأسفل المحادثة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // إضافة رسالة المستخدم
    const newUserMsg: Message = { id: Date.now(), text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");

    // محاكاة الرد الذكي (يمكن ربطه لاحقاً بـ AI أو n8n)
    setTimeout(() => {
      const botReply: Message = {
        id: Date.now() + 1,
        text: "شكراً لتواصلك. سيقوم فريقنا بربط هذا الاستفسار قريباً بخدمة الذكاء الاصطناعي لتقديم أدق التفاصيل حول خدماتنا في دمشق.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  return (
    <>
      {/* الزر العائم لفتح المحادثة */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-transform ${isOpen ? "hidden" : "flex"}`}
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      {/* نافذة المحادثة */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-6 z-50 flex h-[500px] w-[350px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/95 shadow-2xl backdrop-blur-xl"
          >
            {/* رأس المحادثة */}
            <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800/50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">مساعد سَنَد الذكي</h3>
                  <span className="flex items-center gap-1 text-xs text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> متصل الآن
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* منطقة الرسائل */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[85%] gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full mt-1 ${msg.sender === "user" ? "bg-slate-700 text-slate-300" : "bg-emerald-500/20 text-emerald-400"}`}>
                      {msg.sender === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                    </div>
                    
                    <div className={`rounded-2xl px-4 py-2 text-sm leading-relaxed ${msg.sender === "user" ? "bg-emerald-500 text-white rounded-tl-none" : "bg-slate-800 text-slate-200 rounded-tr-none border border-slate-700"}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* حقل الإدخال */}
            <form onSubmit={handleSendMessage} className="border-t border-slate-700 bg-slate-800/50 p-3">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="اكتب استفسارك هنا..."
                  className="w-full rounded-full border border-slate-700 bg-slate-900 py-2.5 pl-12 pr-4 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute left-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send className="h-4 w-4 -ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
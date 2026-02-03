
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Settings, Sparkles, Key, AlertTriangle, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const STORAGE_KEY = 'inmersion_ai_key';

export const AIChatView: React.FC = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem(STORAGE_KEY) || '');
  const [input, setInput] = useState('');
  const [showSettings, setShowSettings] = useState(!localStorage.getItem(STORAGE_KEY));
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'Merhaba! Ben Math Biotech Asistanı. 🧬\n\nMatematik sorularını çözebilirim veya biyolojik kavramları açıklayabilirim. Nasıl yardımcı olabilirim?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const saveApiKey = () => {
    if (apiKey.trim().startsWith('AIza')) {
      localStorage.setItem(STORAGE_KEY, apiKey.trim());
      setShowSettings(false);
    } else {
      alert("Geçerli bir Google Gemini API anahtarı giriniz (AIza... ile başlar).");
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (!apiKey) { setShowSettings(true); return; }

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const genAI = new GoogleGenAI({ apiKey }); // Assuming v2 SDK structure or similar wrapper
      // Fallback for direct REST if SDK differs
      // Using simple fetch for robustness without installing huge SDKs if not present
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Sen bir Matematik ve Biyoteknoloji uzmanısın. Soruları adım adım, formüllerle ve biyolojik örneklerle açıkla.\n\nSoru: ${userMsg}` }] }]
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Bir cevap oluşturulamadı.";
      
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: reply }]);

    } catch (error: any) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: `⚠️ Hata: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">AI Asistan</h2>
            <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">Powered by Gemini</p>
          </div>
        </div>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="mb-6 p-6 bg-slate-900/80 border border-slate-700 rounded-2xl animate-in fade-in slide-in-from-top-4">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Key className="text-yellow-500 w-5 h-5" />
            API Anahtarı Ayarı
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            AI özelliklerini kullanmak için kendi <strong>Google Gemini API</strong> anahtarınızı giriniz.
            Anahtar sadece tarayıcınızda saklanır.
          </p>
          <div className="flex gap-2">
            <input 
              type="password" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-mono text-sm"
            />
            <button 
              onClick={saveApiKey}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-xl font-bold transition-colors"
            >
              Kaydet
            </button>
          </div>
          <p className="text-[10px] text-slate-500 mt-3 flex items-center gap-1">
            <AlertTriangle size={12} />
            Lütfen anahtarınızı kimseyle paylaşmayın.
          </p>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-3xl p-4 overflow-hidden flex flex-col relative">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar pb-20">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-cyan-600 text-white rounded-tr-none' 
                  : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none'
              }`}>
                {msg.role === 'model' ? (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                <Bot className="w-4 h-4 text-cyan-400 animate-bounce" />
                <span className="text-xs text-slate-400">Düşünüyor...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-slate-950 border border-slate-800 rounded-2xl flex items-center p-1.5 pl-4 shadow-xl">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Matematik sorusu veya konu sor..."
                className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-sm font-medium"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl transition-all shadow-lg shadow-cyan-900/20"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

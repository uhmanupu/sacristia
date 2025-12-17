import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Sparkles, Loader2, StopCircle } from 'lucide-react';
import { Message } from '../types';
import { sendMessageStream, resetChat } from '../services/geminiService';
import MarkdownRenderer from './MarkdownRenderer';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: 'Olá! Eu sou o Gemini. Estou pronto para ajudar você a organizar seu dia ou responder suas dúvidas.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiMessageId = (Date.now() + 1).toString();
    setMessages(prev => [
      ...prev,
      {
        id: aiMessageId,
        role: 'model',
        text: '',
        timestamp: new Date()
      }
    ]);

    try {
      const stream = sendMessageStream(userMessage.text);
      let fullText = '';

      for await (const chunk of stream) {
        fullText += chunk;
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessageId 
              ? { ...msg, text: fullText } 
              : msg
          )
        );
      }
    } catch (error) {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, text: 'Desculpe, ocorreu um erro na conexão.', isError: true } 
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
      if (window.confirm('Limpar histórico de conversa?')) {
          setMessages([{
              id: Date.now().toString(),
              role: 'model',
              text: 'Tudo limpo! O que vamos fazer agora?',
              timestamp: new Date()
          }]);
          resetChat();
      }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e212d] border border-white/10 rounded-xl shadow-[0_26px_30px_-10px_rgba(0,0,0,0.7)] overflow-hidden relative">
      
      {/* Glossy Header */}
      <div className="bg-gradient-to-b from-white/10 to-transparent p-4 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 p-2 rounded-lg shadow-lg shadow-blue-500/20">
                <Sparkles size={18} className="text-white" />
            </div>
            <div>
                <h2 className="font-bold text-gray-100 text-lg tracking-wide">Assistente IA</h2>
                <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">Gemini 2.5 Flash</p>
            </div>
        </div>
        <button 
            onClick={handleClearChat}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
            title="Limpar"
        >
            <Trash2 size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[90%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 border border-white/10 shadow-lg
                ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white'}`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>

              {/* Bubble */}
              <div
                className={`flex flex-col p-4 rounded-2xl shadow-md text-sm md:text-base backdrop-blur-sm
                  ${msg.role === 'user' 
                    ? 'bg-blue-600/90 text-white rounded-tr-none border border-blue-500/50' 
                    : 'bg-[#2a2d3a] text-gray-200 rounded-tl-none border border-white/5'
                  } ${msg.isError ? 'border-red-500/50 bg-red-900/20 text-red-200' : ''}`}
              >
                {msg.role === 'model' ? (
                     msg.text === '' ? (
                         <div className="flex gap-1 items-center h-6">
                             <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                             <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                             <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                         </div>
                     ) : (
                        <div className={`prose prose-invert prose-sm max-w-none`}>
                            <MarkdownRenderer content={msg.text} />
                        </div>
                     )
                ) : (
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                )}
                
                <span className={`text-[10px] mt-2 opacity-50 ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gradient-to-t from-[#151720] to-transparent">
        <div className="relative flex items-end gap-2 bg-[#252833] rounded-xl p-2 border border-white/10 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500/50 transition-all shadow-lg">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pergunte algo ou peça para adicionar uma tarefa..."
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-2.5 px-3 text-gray-100 placeholder:text-gray-500"
            rows={1}
            style={{ height: 'auto', minHeight: '44px' }}
            onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2.5 rounded-lg flex-shrink-0 mb-0.5 transition-all duration-300
              ${input.trim() && !isLoading 
                ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/30' 
                : 'bg-white/5 text-gray-500 cursor-not-allowed'}`}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
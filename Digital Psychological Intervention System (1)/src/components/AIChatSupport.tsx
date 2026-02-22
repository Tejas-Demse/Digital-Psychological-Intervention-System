import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  needsReferral?: boolean;
}

const AI_RESPONSES = {
  greeting: "Hello! I'm your MindCare AI assistant. I'm here to provide emotional first-aid support and coping strategies. How are you feeling today?",
  stress: "I understand you're feeling stressed. Here are some immediate coping strategies:\n\n1. Try the 4-7-8 breathing technique: Breathe in for 4 counts, hold for 7, exhale for 8\n2. Take a 5-minute break to step outside or away from your workspace\n3. Write down three things causing stress and one small action for each\n\nWould you like me to guide you through a relaxation exercise?",
  anxiety: "Anxiety can be overwhelming. Let's try some grounding techniques:\n\n1. 5-4-3-2-1 Method: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste\n2. Focus on slow, deep breaths\n3. Remember: This feeling is temporary\n\nIf anxiety persists or worsens, I recommend booking an appointment with our counsellor. Would you like help with that?",
  crisis: "I hear that you're going through a very difficult time. Your safety and wellbeing are the top priority.\n\n⚠️ If you're having thoughts of self-harm, please:\n• Call our 24/7 Crisis Hotline: 1-800-HELP-NOW\n• Visit the nearest emergency room\n• Reach out to a trusted friend or family member\n\nI strongly recommend speaking with a professional counsellor. Can I help you book an urgent appointment?",
  sad: "It's completely valid to feel sad. Here are some gentle suggestions:\n\n1. Allow yourself to feel - emotions are valid\n2. Reach out to someone you trust\n3. Engage in a small activity you usually enjoy\n4. Practice self-compassion\n\nRemember, persistent sadness for more than two weeks may benefit from professional support. Our counsellors are here for you.",
  default: "Thank you for sharing that with me. While I can offer general coping strategies, it sounds like you might benefit from speaking with one of our professional counsellors. They can provide personalized support for your situation.\n\nWould you like me to help you book an appointment, or would you like to explore our resource hub for additional information?"
};

export function AIChatSupport() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: AI_RESPONSES.greeting,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): { content: string; needsReferral?: boolean } => {
    const lowercaseMsg = userMessage.toLowerCase();
    
    // HIGH-RISK AUTOMATIC ESCALATION
    if (lowercaseMsg.includes('suicide') || lowercaseMsg.includes('kill myself') || lowercaseMsg.includes('end it all') || lowercaseMsg.includes('self-harm') || lowercaseMsg.includes('want to die') || lowercaseMsg.includes('better off dead')) {
      // Trigger automatic escalation (in production, this would alert staff)
      console.warn('HIGH-RISK CHAT DETECTED - Automatic escalation triggered');
      return { content: AI_RESPONSES.crisis, needsReferral: true };
    }
    if (lowercaseMsg.includes('stress') || lowercaseMsg.includes('overwhelmed') || lowercaseMsg.includes('pressure')) {
      return { content: AI_RESPONSES.stress };
    }
    if (lowercaseMsg.includes('anxious') || lowercaseMsg.includes('anxiety') || lowercaseMsg.includes('panic') || lowercaseMsg.includes('worried')) {
      return { content: AI_RESPONSES.anxiety, needsReferral: true };
    }
    if (lowercaseMsg.includes('sad') || lowercaseMsg.includes('depressed') || lowercaseMsg.includes('down') || lowercaseMsg.includes('hopeless')) {
      return { content: AI_RESPONSES.sad };
    }
    
    return { content: AI_RESPONSES.default, needsReferral: true };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        needsReferral: aiResponse.needsReferral
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-[#E2E8F0] h-[calc(100vh-12rem)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] text-white rounded-t-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-white text-xl font-bold flex items-center gap-2">
              AI First-Aid Support
              <Sparkles className="w-5 h-5" />
            </h2>
            <p className="text-white/90 text-sm font-medium mt-0.5">Confidential & Available 24/7</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-[#F8FAFC] to-white">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            {message.type === 'ai' && (
              <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#4F46E5] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <Bot className="w-6 h-6 text-white" />
              </div>
            )}
            
            <div className={`max-w-[75%] ${message.type === 'user' ? 'order-1' : ''}`}>
              <div
                className={`rounded-2xl p-4 shadow-md ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] text-white'
                    : 'bg-white text-[#1E293B] border border-[#E2E8F0]'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
              {message.needsReferral && (
                <div className="mt-3 flex items-start gap-3 bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] border border-[#FCD34D] rounded-xl p-4 shadow-sm">
                  <AlertCircle className="w-5 h-5 text-[#92400E] flex-shrink-0 mt-0.5" />
                  <p className="text-[#92400E] text-sm font-medium">
                    Consider booking an appointment with a professional counsellor for personalized support.
                  </p>
                </div>
              )}
              <p className="text-[#94A3B8] text-xs mt-2 font-medium">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {message.type === 'user' && (
              <div className="w-10 h-10 bg-gradient-to-br from-[#14B8A6] to-[#0F9688] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <User className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#4F46E5] rounded-xl flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-md">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2.5 h-2.5 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2.5 h-2.5 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-5 border-t border-[#E2E8F0] bg-white rounded-b-2xl">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share how you're feeling... (Press Enter to send)"
            className="flex-1 px-4 py-3.5 border border-[#E2E8F0] rounded-xl resize-none bg-[#F8FAFC] hover:bg-white focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all outline-none text-[#1E293B]"
            rows={2}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-6 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] text-white rounded-xl hover:from-[#4338CA] hover:to-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[#94A3B8] text-xs mt-3 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></span>
          This AI provides general support. For urgent matters, call <span className="font-bold text-[#EF4444]">1-800-HELP-NOW</span>
        </p>
      </div>
    </div>
  );
}

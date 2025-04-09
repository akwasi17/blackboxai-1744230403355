import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { addDoc, collection, query, orderBy, onSnapshot, where, limit } from 'firebase/firestore';
import { db, chatsCollection } from '../firebase';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import { 
  ShieldCheckIcon,
  NewspaperIcon,
  MapPinIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  PaperAirplaneIcon,
  ChatBubbleLeftIcon,
  UserCircleIcon
} from '@heroicons/react/24/solid';

function Chatbot({ onViewChange }) {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState([
    'Report a crime',
    'Find police stations', 
    'See recent incidents',
    'Safety tips'
  ]);

  // Load chat history
  useEffect(() => {
    if (!currentUser) return;
    
    const q = query(
      chatsCollection,
      where('userId', '==', currentUser.uid),
      orderBy('timestamp', 'asc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(chatData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Initial bot greeting
  useEffect(() => {
    if (messages.length === 0 && currentUser) {
      setMessages([{
        text: `Hello ${currentUser.profile?.name || 'there'}! I'm here to help with crime-related information.`,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        userId: currentUser.uid
      }]);
    }
  }, [currentUser, messages.length]);

  const sendMessage = async (text, sender = 'user') => {
    if (!text.trim()) return;

    // Add user message
    const newMessage = {
      text,
      sender,
      timestamp: new Date().toISOString(),
      userId: currentUser?.uid || null
    };
    
    await addDoc(chatsCollection, newMessage);
    setInput('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(async () => {
      const response = generateResponse(text);
      await addDoc(chatsCollection, {
        text: response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        userId: currentUser?.uid || null
      });
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (input) => {
    const lowerInput = input.toLowerCase().trim();
    
    // Greetings
    if (/^(hi|hello|hey|greetings|good (morning|afternoon|evening))[!.]?$/i.test(lowerInput)) {
      const greetings = ["Hello!", "Hi there!", "Greetings!", "Hello! How can I help?"];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Thanks/acknowledgement
    if (/^(thanks|thank you|appreciate it|cheers)[!.]?$/i.test(lowerInput)) {
      return "You're welcome! Is there anything else I can help with?";
    }

    // Questions about capabilities
    if (/what can you do|how can you help|your (role|purpose)/i.test(lowerInput)) {
      return "I'm a crime awareness assistant. I can help you:\n" +
        "- Report crimes\n- Find police stations\n" +
        "- Check recent incidents\n- Provide safety tips\n" +
        "- Answer crime-related questions";
    }

    // Core functionality
    if (lowerInput.includes('report') || lowerInput.includes('crime')) {
      return 'I can help you file a crime report. Would you like to: 1) Report a new incident or 2) Check status of existing report?';
    }
    else if (lowerInput.includes('station') || lowerInput.includes('police')) {
      return 'Here are nearby police stations. Would you like directions to any?';
    }
    else if (lowerInput.includes('incident') || lowerInput.includes('feed')) {
      return 'Showing recent crime reports in your area...';
    }
    else if (lowerInput.includes('safety') || lowerInput.includes('tip') || lowerInput.includes('prevention')) {
      return `Here are comprehensive safety tips:

🔹 General Awareness:
• Stay alert in crowded areas and avoid phone distractions
• Keep valuables hidden and secure your phone
• Vary your routines and trust your instincts
• Save emergency numbers: Police (999/112/911)

🚗 Transportation Safety:
• Use trusted taxis/ride-sharing apps
• Keep car doors locked and windows up
• Be cautious of "bumps" - could be carjacking
• Avoid displaying valuables in matatus

🏠 Home Security:
• Secure all doors/windows with proper locks
• Verify visitor identities before entry
• Inform security/neighbors about expected guests
• Consider security cameras/alarms

⚠️ If Confronted:
• Prioritize life over possessions
• Stay calm and observe details
• Report incidents immediately to police

For specific concerns, ask about:
• Home security measures
• Safe transportation options
• Emergency procedures`;
    }

    // Default responses
    const defaultResponses = [
      "I'm a crime awareness assistant. You can ask me about reporting crimes, finding police stations, or safety tips.",
      "I'm here to help with crime-related information. What would you like to know?",
      "For crime awareness assistance, you can ask me about reporting incidents, police stations, or safety tips."
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleQuickAction = (action) => {
    switch(action) {
      case 'Report a crime':
        onViewChange('report');
        break;
      case 'Find police stations':
        onViewChange('stations');
        break;
      case 'See recent incidents':
        onViewChange('feeds');
        break;
      case 'Safety tips':
        sendMessage("Here are some important safety tips:\n\n" +
          "1. Be aware of your surroundings\n" +
          "2. Avoid walking alone at night\n" + 
          "3. Keep valuables out of sight\n" +
          "4. Trust your instincts\n" +
          "5. Have emergency numbers saved\n" +
          "6. Share your location with trusted contacts");
        break;
      default:
        sendMessage(action);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary-dark text-white p-4 flex items-center shadow-sm">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 animate-pulse">
          <ShieldCheckIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Crime Awareness Assistant</h2>
          <p className="text-xs text-white/90">
            {currentUser ? `Hello ${currentUser.profile?.name}` : 'Anonymous user'}
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/30">
        {messages.length === 0 && (
          <div className="text-center py-8 animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-3 bg-primary/5 rounded-full flex items-center justify-center">
              <ChatBubbleLeftIcon className="w-8 h-8 text-primary/30" />
            </div>
            <p className="text-sm text-gray-500 font-medium">Start a conversation about crime awareness</p>
            <p className="text-xs text-gray-400 mt-1">Try asking about reporting crimes or finding police stations</p>
          </div>
        )}
        
        {messages.map((msg, index) => (
          <div key={msg.id} className={`animate-fade-in-up ${index === messages.length - 1 ? 'animate-duration-300' : ''}`}>
            <Message message={msg} currentUser={currentUser} />
          </div>
        ))}
        
        {isTyping && <TypingIndicator />}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
        {/* Quick Replies */}
        <div className="flex space-x-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
          {quickReplies.map((text) => (
            <button
              key={text}
              onClick={() => handleQuickAction(text)}
              className="flex-shrink-0 bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm hover:bg-gray-50 hover:border-primary/30 hover:text-primary transition-all duration-200 shadow-sm"
            >
              {text}
            </button>
          ))}
        </div>

        {/* Text Input */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder-gray-400"
            placeholder="Type your message..."
          />
          <button
            onClick={() => sendMessage(input)}
            className="bg-gradient-to-br from-primary to-primary-dark text-white px-4 py-2.5 rounded-xl hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
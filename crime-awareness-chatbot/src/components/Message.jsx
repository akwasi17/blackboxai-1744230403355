import { format } from 'date-fns';
import PropTypes from 'prop-types';

export default function Message({ message, currentUser }) {
  if (!message || !message.text || !message.timestamp) {
    console.error("Invalid message data", message);
    return (
      <div className="flex justify-center mb-4" role="alert">
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg">
          Error loading message
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4 transition-all duration-200`}
      role="listitem"
      aria-live="polite"
    >
      <div 
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
          message.sender === 'user' 
            ? 'bg-primary text-white rounded-br-none shadow-primary/30' 
            : 'bg-gray-50 text-gray-800 rounded-bl-none shadow-gray-200'
        } transition-all duration-200`}
        aria-label={`Message from ${message.sender}`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <p 
          className={`text-xs opacity-70 mt-1 text-right ${
            message.sender === 'user' ? 'text-white/80' : 'text-gray-500'
          }`}
          aria-label={`Sent at ${format(new Date(message.timestamp), 'h:mm a')}`}
        >
          {format(new Date(message.timestamp), 'h:mm a')}
        </p>
      </div>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date)
    ]).isRequired,
  }).isRequired,
  currentUser: PropTypes.string.isRequired,
};
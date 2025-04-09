import PropTypes from 'prop-types';

export default function TypingIndicator({ color = 'gray-400', size = '2' }) {
  const sizeClass = size === '2' ? 'w-2 h-2' : 'w-4 h-4'; // Adjust size based on input

  return (
    <div className="flex justify-start mb-4 transition-all duration-200" role="status" aria-label="Typing indicator">
      <div className="bg-gray-50 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm shadow-gray-200">
        <div className="flex space-x-2">
          <div 
            className={`${sizeClass} bg-${color} rounded-full animate-pulse`}
            style={{animationDelay: '0ms'}}
            aria-hidden="true"
          ></div>
          <div 
            className={`${sizeClass} bg-${color} rounded-full animate-pulse`}
            style={{animationDelay: '150ms'}}
            aria-hidden="true"
          ></div>
          <div 
            className={`${sizeClass} bg-${color} rounded-full animate-pulse`}
            style={{animationDelay: '300ms'}}
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </div>
  );
}

TypingIndicator.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

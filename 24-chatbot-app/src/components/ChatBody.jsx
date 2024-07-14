// src/components/ChatBody.js
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faUserCircle, faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';
import fetchBotResponse from '../utils/fetchBotResponse';
import typingEffect from '../utils/typingEffect';

// ChatBody component responsible for rendering the chat interface
const ChatBody = ({ bot }) => {
  // State to store messages, user input, profile visibility, and menu visibility
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Reference to the profile container for click outside detection
  const profileRef = useRef(null);

  // Load messages from local storage when the bot changes
  useEffect(() => {
    if (bot) {
      const storedMessages = localStorage.getItem(bot.name);
      setMessages(storedMessages ? JSON.parse(storedMessages) : []);
    }
  }, [bot]);

  // Handle clicks outside the profile container to close the profile view
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileRef]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { type: 'user', text: input }];
      setMessages(newMessages);
      setInput('');
      localStorage.setItem(bot.name, JSON.stringify(newMessages));

      // Fetch response from the bot
      try {
        const botResponse = await fetchBotResponse[bot.name.toLowerCase().replace(/ /g, '')](input);
        typingEffect(botResponse, (typedText) => {
          const updatedMessages = [...newMessages, { type: 'bot', text: typedText }];
          setMessages(updatedMessages);
          localStorage.setItem(bot.name, JSON.stringify(updatedMessages));
        });
      } catch (error) {
        const updatedMessages = [...newMessages, { type: 'bot', text: 'Error: Could not fetch response from the bot.' }];
        setMessages(updatedMessages);
        localStorage.setItem(bot.name, JSON.stringify(updatedMessages));
      }
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle Enter key press to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Clear chat messages
  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(bot.name);
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Show profile view
  const viewProfile = () => {
    setShowProfile(true);
    setShowMenu(false);
  };

  return (
    <div className="flex-1 flex flex-col p-6 bg-gray-800 relative overflow-hidden">
      {bot ? (
        <>
          {/* Header with bot icon and name, and menu toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">{bot.icon}</span>
              </div>
              <h2 className="text-white text-2xl ml-4">{bot.name}</h2>
            </div>
            <div className="relative">
              <FontAwesomeIcon icon={faEllipsisV} className="text-white cursor-pointer" onClick={toggleMenu} />
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div
                    className="py-2 px-4 cursor-pointer hover:bg-blue-500 hover:text-white rounded-lg"
                    onClick={viewProfile}
                  >
                    Profile
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Profile view */}
          {showProfile && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
              <div ref={profileRef} className="bg-gray-700 p-10 rounded-lg shadow-lg">
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-blue-500 w-32 h-32 rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-5xl">{bot.icon}</span>
                  </div>
                  <h2 className="text-white text-3xl">{bot.name}</h2>
                </div>
              </div>
            </div>
          )}
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-center ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'user' ? (
                  <>
                    <div className="bg-blue-500 text-white p-4 rounded-lg max-w-lg">{message.text}</div>
                    <div className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center ml-4">
                      <FontAwesomeIcon icon={faUserCircle} className="text-white" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white">{bot.icon}</span>
                    </div>
                    <div className="bg-gray-700 text-gray-300 p-4 rounded-lg max-w-lg">{message.text}</div>
                  </>
                )}
              </div>
            ))}
          </div>
          {/* Input and action buttons */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Message..."
              className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendMessage} className="ml-4 p-2 rounded-full bg-blue-500 hover:bg-blue-700 text-white">
              <FontAwesomeIcon icon={faPaperPlane} className="w-6 h-6" />
            </button>
            <button onClick={clearChat} className="ml-2 p-2 rounded-full bg-red-500 hover:bg-red-700 text-white">
              <FontAwesomeIcon icon={faTrash} className="w-6 h-6" />
            </button>
          </div>
        </>
      ) : (
        // Prompt to select a bot if none is selected
        <div className="flex items-center justify-center h-full text-white">Select a bot to start chatting</div>
      )}
    </div>
  );
};

export default ChatBody;

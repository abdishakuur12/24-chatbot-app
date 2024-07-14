// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import MainSidebar from './components/MainSidebar';
import Sidebar from './components/Sidebar';
import ChatBody from './components/ChatBody';
import Categories from './components/Categories';
import './index.css';

const App = () => {
  const [selectedBot, setSelectedBot] = useState(null);
  const [selectedSection, setSelectedSection] = useState('chat');
  const [theme, setTheme] = useState({
    name: 'Light',
    background: 'bg-white',
    text: 'text-black',
    buttonBackground: 'bg-gray-200',
    buttonText: 'text-black',
  });
  const [showThemes, setShowThemes] = useState(false);
  const themesRef = useRef(null);

  const bots = [
    { name: 'ChatGPT', icon: '🤖', description: 'OpenAI GPT-3', rank: 1, rating: 5, apiEndpoint: 'https://api.openai.com/v1/engines/davinci-codex/completions' },
    { name: 'Siri', icon: '🍏', description: 'Apple AI Assistant', rank: 2, rating: 4.8, apiEndpoint: 'https://api.siri.com/query' },
    { name: 'Alexa', icon: '🔊', description: 'Amazon AI Assistant', rank: 3, rating: 4.7, apiEndpoint: 'https://api.alexa.com/query' },
    { name: 'Google Assistant', icon: '🌐', description: 'Google AI Assistant', rank: 4, rating: 4.6, apiEndpoint: 'https://assistant.google.com/api/query' },
    { name: 'Cortana', icon: '💻', description: 'Microsoft AI Assistant', rank: 5, rating: 4.5, apiEndpoint: 'https://api.cortana.ai/query' },
    { name: 'Bixby', icon: '📱', description: 'Samsung AI Assistant', rank: 6, rating: 4.4, apiEndpoint: 'https://api.bixby.samsung.com/query' },
    { name: 'Watson', icon: '💼', description: 'IBM AI Assistant', rank: 7, rating: 4.3, apiEndpoint: 'https://api.watson.ibm.com/assistant/api/v1/workspaces' },
    { name: 'Replika', icon: '🧠', description: 'AI Friend and Companion', rank: 8, rating: 4.2, apiEndpoint: 'https://api.replika.ai/v1/chat' },
    { name: 'ELIZA', icon: '📝', description: 'Historic AI Chatbot', rank: 9, rating: 4.1, apiEndpoint: 'https://api.eliza.com/query' },
    { name: 'Sophia', icon: '👩', description: 'Hanson Robotics AI', rank: 10, rating: 4.0, apiEndpoint: 'https://api.sophia.ai/query' },
    { name: 'Mitsuku', icon: '💬', description: 'Pandorabots AI', rank: 11, rating: 3.9, apiEndpoint: 'https://api.pandorabots.com/mitsuku/query' },
    { name: 'Rasa', icon: '🎭', description: 'Open Source AI', rank: 12, rating: 3.8, apiEndpoint: 'https://api.rasa.com/core/webhooks/rest/webhook' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themesRef.current && !themesRef.current.contains(event.target)) {
        setShowThemes(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [themesRef]);

  const handleSelectTheme = (newTheme) => {
    setTheme(newTheme);
    setShowThemes(false);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'chat':
        return (
          <div className={`flex h-full ${theme.background} ${theme.text}`}>
            <Sidebar bots={bots} selectBot={setSelectedBot} theme={theme} />
            {selectedBot && <ChatBody bot={selectedBot} theme={theme} />}
          </div>
        );
      case 'categories':
        return (
          <div className={`flex h-full ${theme.background} ${theme.text}`}>
            <Categories bots={bots} theme={theme} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`App flex ${theme.background} ${theme.text} h-screen`}>
      <MainSidebar
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        showThemes={showThemes}
        setShowThemes={setShowThemes}
        themesRef={themesRef}
        onSelectTheme={handleSelectTheme}
        currentTheme={theme}
      />
      <div className="flex-1 ml-16 flex flex-col overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;

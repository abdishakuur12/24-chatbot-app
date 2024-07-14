// src/components/MainSidebar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons';

const MainSidebar = ({ selectedSection, setSelectedSection, showThemes, setShowThemes, themesRef, onSelectTheme, currentTheme }) => {
  const themes = [
    { name: 'Light', background: 'bg-white', text: 'text-black', buttonBackground: 'bg-gray-200', buttonText: 'text-black' },
    { name: 'Dark', background: 'bg-gray-800', text: 'text-white', buttonBackground: 'bg-gray-700', buttonText: 'text-white' },
    // Add more themes here
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-16 bg-gray-800 flex flex-col items-center py-4 space-y-4">
      <div className="flex flex-col items-center space-y-4 flex-1 justify-center">
        <div
          className={`w-10 h-10 p-2 rounded-full flex items-center justify-center cursor-pointer ${selectedSection === 'chat' ? 'bg-blue-500' : 'bg-gray-800'}`}
          onClick={() => setSelectedSection('chat')}
        >
          <FontAwesomeIcon icon={faComments} className="text-white" />
        </div>
        <div
          className={`w-10 h-10 p-2 rounded-full flex items-center justify-center cursor-pointer ${selectedSection === 'categories' ? 'bg-blue-500' : 'bg-gray-800'}`}
          onClick={() => setSelectedSection('categories')}
        >
          <FontAwesomeIcon icon={faChartBar} className="text-white" />
        </div>
        <div
          className={`w-10 h-10 p-2 rounded-full flex items-center justify-center cursor-pointer relative ${showThemes ? 'bg-blue-500' : 'bg-gray-800'}`}
          onClick={() => setShowThemes(!showThemes)}
        >
          <FontAwesomeIcon icon={faCog} className="text-white" />
          {showThemes && (
            <div ref={themesRef} className="absolute top-12 left-0 bg-white rounded-lg shadow-lg z-10 p-2">
              {themes.map((theme) => (
                <div
                  key={theme.name}
                  className={`p-2 m-2 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white ${theme.background} ${theme.text} ${currentTheme.name === theme.name ? 'border-2 border-blue-500' : ''}`}
                  onClick={() => onSelectTheme(theme)}
                >
                  {theme.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
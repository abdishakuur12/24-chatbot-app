// src/components/Themes.js
import React from 'react';

const Themes = ({ onSelectTheme }) => {
  const themes = [
    { name: 'Light', background: 'bg-white', text: 'text-black', buttonBackground: 'bg-gray-200', buttonText: 'text-black' },
    { name: 'Dark', background: 'bg-gray-800', text: 'text-white', buttonBackground: 'bg-gray-700', buttonText: 'text-white' },
    // Add more themes here
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Select Theme</h1>
      <div className="space-y-4">
        {themes.map(theme => (
          <div
            key={theme.name}
            className={`p-4 rounded-lg cursor-pointer ${theme.background} ${theme.text}`}
            onClick={() => onSelectTheme(theme)}
          >
            {theme.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Themes;

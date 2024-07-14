// src/components/Sidebar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ bots, selectBot, theme }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBots = bots.filter(bot => bot.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={`w-64 ${theme.background} flex flex-col py-4 h-full`}>
      <div className="px-4">
        <div className="relative text-gray-600">
          <input
            type="text"
            className={`${theme.buttonBackground} h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full`}
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="absolute right-0 top-0 mt-3 mr-4" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto mt-4">
        {filteredBots.map(bot => (
          <div
            key={bot.name}
            className={`flex items-center p-4 cursor-pointer hover:bg-gray-600 ${theme.text}`}
            onClick={() => selectBot(bot)}
          >
            <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">{bot.icon}</span>
            </div>
            <div className="ml-4">
              <h2 className="text-lg">{bot.name}</h2>
              <p className="text-sm">{bot.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

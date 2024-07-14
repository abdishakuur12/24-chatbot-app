// src/components/Categories.js
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Categories = ({ bots, theme }) => {
  // Sort bots from best to lowest
  const sortedBots = bots.sort((a, b) => a.rank - b.rank);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i - rating === 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  return (
    <div className={`flex flex-col items-center justify-center h-full p-6 ${theme.background} ${theme.text}`}>
      <h1 className="text-4xl mb-4">AI Categories</h1>
      <p className="mb-8">List of AI bots categorized from best to lowest.</p>
      <div className="w-full max-w-3xl overflow-y-auto" style={{ maxHeight: '80vh' }}>
        <h2 className="text-2xl mb-4">Here are the best bots:</h2>
        {sortedBots.map((bot, index) => (
          <div key={bot.name} className={`flex items-center p-4 mb-4 rounded-lg shadow-lg ${theme.buttonBackground}`}>
            <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">{bot.icon}</span>
            </div>
            <div className="ml-4 flex-1">
              <h2 className="text-lg">{index + 1}. {bot.name}</h2>
              <p className="text-sm">{bot.description}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center">
                {renderStars(bot.rating)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

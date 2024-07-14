// src/components/Categories.js
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Import star icons from react-icons library

// Define the Categories component, which accepts props: bots (an array of bot objects) and theme (an object containing theme styles)
const Categories = ({ bots, theme }) => {
  // Sort bots array in ascending order based on their rank
  const sortedBots = bots.sort((a, b) => a.rank - b.rank);

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Full star for each whole number in the rating
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i - rating === 0.5) {
        // Half star for each 0.5 in the rating
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        // Empty star for the rest
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  return (
    <div className={`flex flex-col items-center justify-center h-full p-6 ${theme.background} ${theme.text}`}>
      {/* Page title */}
      <h1 className="text-4xl mb-4">AI Categories</h1>
      <p className="mb-8">List of AI bots categorized from best to lowest.</p>
      {/* Container for the list of bots with a max height and scrollable area */}
      <div className="w-full max-w-3xl overflow-y-auto" style={{ maxHeight: '80vh' }}>
        <h2 className="text-2xl mb-4">Here are the best bots:</h2>
        {/* Map over sortedBots array and render each bot */}
        {sortedBots.map((bot, index) => (
          <div key={bot.name} className={`flex items-center p-4 mb-4 rounded-lg shadow-lg ${theme.buttonBackground}`}>
            {/* Bot icon container */}
            <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">{bot.icon}</span>
            </div>
            {/* Bot details container */}
            <div className="ml-4 flex-1">
              <h2 className="text-lg">{index + 1}. {bot.name}</h2>
              <p className="text-sm">{bot.description}</p>
            </div>
            {/* Bot rating container */}
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

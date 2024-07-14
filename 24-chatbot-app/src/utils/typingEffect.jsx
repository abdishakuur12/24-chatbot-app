// src/utils/typingEffect.js
const typingEffect = (text, callback) => {
    let index = 0;
    const interval = setInterval(() => {
      callback(text.substring(0, index));
      index++;
      if (index > text.length) {
        clearInterval(interval);
      }
    }, 50); // Adjust speed as needed
  };
  
  export default typingEffect;
  
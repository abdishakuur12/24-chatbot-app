// src/utils/fetchBotResponse.js
import matchQuestion from './matchQuestion';

const fetchBotResponse = {
  chatgpt: async (message) => {
    if (message.toLowerCase().includes('who are you')) {
      return "I am ChatGPT, your AI assistant.";
    }
    const matchedQuestion = matchQuestion(message);
    if (matchedQuestion) {
      return matchedQuestion.answer;
    }
    return "I don't have any idea about this.";
  },

  alexa: async (message) => {
    if (message.toLowerCase().includes('who are you')) {
      return "I am Alexa, your AI assistant.";
    }
    const matchedQuestion = matchQuestion(message);
    if (matchedQuestion) {
      return matchedQuestion.answer;
    }
    return "I don't have any idea about this.";
  },

  googleassistant: async (message) => {
    if (message.toLowerCase().includes('who are you')) {
      return "I am Google Assistant, your AI assistant.";
    }
    const matchedQuestion = matchQuestion(message);
    if (matchedQuestion) {
      return matchedQuestion.answer;
    }
    return "I don't have any idea about this.";
  },

  cortana: async (message) => {
    if (message.toLowerCase().includes('who are you')) {
      return "I am Cortana, your AI assistant.";
    }
    const matchedQuestion = matchQuestion(message);
    if (matchedQuestion) {
      return matchedQuestion.answer;
    }
    return "I don't have any idea about this.";
  },

  bixby: async (message) => {
    if (message.toLowerCase().includes('who are you')) {
      return "I am Bixby, your AI assistant.";
    }
    const matchedQuestion = matchQuestion(message);
    if (matchedQuestion) {
      return matchedQuestion.answer;
    }
    return "I don't have any idea about this.";
  },

  watson: async (message) => {
    if (message.toLowerCase().includes('who are you')) {
      return "I am Watson, your AI assistant.";
    }
    const matchedQuestion = matchQuestion(message);
    if (matchedQuestion) {
      return matchedQuestion.answer;
    }
    return "I don't have any idea about this.";
  },

  siri: async (message) => {
    if (message.toLowerCase().includes('who are you')) {
      return "I am Siri, your AI assistant.";
    }
    const matchedQuestion = matchQuestion(message);
    if (matchedQuestion) {
      return matchedQuestion.answer;
    }
    return "I don't have any idea about this.";
  },

  replika: async (message) => {
    if (message.toLowerCase().includes('who are you')) {
      return "I am Replika, your AI companion.";
    }
    const matchedQuestion = matchQuestion(message);
    if (matchedQuestion) {
      return matchedQuestion.answer;
    }
    return "I don't have any idea about this.";
  },

  eliza: async (message) => {
    if (message.toLowerCase().includes('who are you')) {
      return "I am ELIZA, your AI chatbot.";
    }
    const matchedQuestion = matchQuestion(message);
    if (matchedQuestion) {
      return matchedQuestion.answer;
    }
    return "I don't have any idea about this.";
  },

  sophia: async (message) => {
    if (message.toLowerCase().includes('who are you')) {
      return "I am Sophia, your AI robot.";
    }
    const matchedQuestion = matchQuestion(message);
    if (matchedQuestion) {
      return matchedQuestion.answer;
    }
    return "I don't have any idea about this.";
  },

  mitsuku: async (message) => {
    if (message.toLowerCase().includes('who are you')) {
      return "I am Mitsuku, your AI chatbot.";
    }
    const matchedQuestion = matchQuestion(message);
    if (matchedQuestion) {
      return matchedQuestion.answer;
    }
    return "I don't have any idea about this.";
  },

  rasa: async (message) => {
    if (message.toLowerCase().includes('who are you')) {
      return "I am Rasa, your AI assistant.";
    }
    const matchedQuestion = matchQuestion(message);
    if (matchedQuestion) {
      return matchedQuestion.answer;
    }
    return "I don't have any idea about this.";
  },
};

export default fetchBotResponse;

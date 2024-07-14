// src/utils/matchQuestion.js
import possibleQuestions from './possibleQuestions';

const similarity = (s1, s2) => {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  const longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  return ((longerLength - editDistance(longer, shorter)) / parseFloat(longerLength));
}

const editDistance = (s1, s2) => {
  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0)
        costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

const matchQuestion = (userQuestion) => {
  let bestMatch = null;
  let highestSimilarity = 0;

  possibleQuestions.forEach((q) => {
    const sim = similarity(userQuestion.toLowerCase(), q.question.toLowerCase());
    if (sim > highestSimilarity) {
      highestSimilarity = sim;
      bestMatch = q;
    }
  });

  if (highestSimilarity > 0.7) {
    return bestMatch;
  }

  return null;
}

export default matchQuestion;

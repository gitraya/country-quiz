// Get random number
export const randomNum = function (max) {
  let number = Math.floor(Math.random() * max);
  return number;
};

// Shuffle array
export const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

// Get unique random number
export const generateUniqueRandom = (max, arr) => {
  let number = randomNum(max);

  if (!arr.includes(number)) {
    arr.push(number);
    return number;
  } else {
    if (arr.length < max) {
      return generateUniqueRandom(max, arr);
    } else {
      return false;
    }
  }
};

// Get and store random capital quiz
export const storeCapitalQuiz = (
  allCountries,
  capitalQuiz,
  setCapitalQuiz,
  quizState,
  setQuizState
) => {
  setQuizState({
    ...quizState,
    startQuiz: true,
    isFalse: false,
    isTrue: false,
  });

  let trueCountry = allCountries[randomNum(250)];
  if (!trueCountry.capital) trueCountry = allCountries[randomNum(250)];
  let falseCountry = [];
  let randArr = [];

  for (let i = 1; i <= 3; i++) {
    let rand = generateUniqueRandom(250, randArr);
    falseCountry.push(allCountries[rand].name);
  }

  const option = [trueCountry.name, ...falseCountry];
  shuffle(option);

  const updateCapitalQuiz = {
    question: trueCountry.capital,
    answer: {
      trueAnswer: trueCountry.name,
      falseAnswer: falseCountry,
    },
    option: option,
    alfabet: capitalQuiz.alfabet,
  };

  setCapitalQuiz(updateCapitalQuiz);
};

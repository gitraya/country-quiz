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

// Get and store random quiz question
export const getQuizQuestion = (
  allCountries,
  quizTypeState,
  setQuizTypeState,
  type
) => {
  let trueCountry = allCountries[randomNum(250)];
  switch (type) {
    case 'capital':
      if (!trueCountry.capital)
        return (trueCountry = allCountries[randomNum(250)]);
      break;
    case 'flag':
      if (!trueCountry.flag)
        return (trueCountry = allCountries[randomNum(250)]);
      break;
    default:
      break;
  }
  let falseCountry = [];
  let randArr = [];

  for (let i = 1; i <= 3; i++) {
    let rand = generateUniqueRandom(250, randArr);
    falseCountry.push(allCountries[rand].name);
  }

  const option = [trueCountry.name, ...falseCountry];
  shuffle(option);

  const updateQuizType = {
    question:
      type === 'capital'
        ? trueCountry.capital
        : type === 'flag'
        ? trueCountry.flag
        : '',
    answer: {
      trueAnswer: trueCountry.name,
      falseAnswer: falseCountry,
    },
    option: option,
    alfabet: quizTypeState.alfabet,
  };

  setQuizTypeState(updateQuizType);
};

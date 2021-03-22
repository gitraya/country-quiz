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
  if (type === 'capital')
    allCountries = allCountries.filter((country) => country.capital !== '');
  if (type === 'flag')
    allCountries = allCountries.filter((country) => country.flag !== '');

  // Generate country data for question and true answer
  let trueCountry = allCountries[randomNum(allCountries.length)];
  switch (type) {
    case 'capital':
      if (!trueCountry.capital)
        return (trueCountry = allCountries[randomNum(allCountries.length)]);
      break;
    case 'flag':
      if (!trueCountry.flag)
        return (trueCountry = allCountries[randomNum(allCountries.length)]);
      break;
    default:
      break;
  }

  // Generate country data for false answer
  let falseCountry = [];
  let randArr = [];

  for (let i = 1; i <= 3; i++) {
    let rand = generateUniqueRandom(allCountries.length, randArr);
    falseCountry.push(allCountries[rand].name);
  }

  // Shuffle answer option
  const option = [trueCountry.name, ...falseCountry];
  shuffle(option);

  // Set updated quiz
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

  // Update quiz
  setQuizTypeState(updateQuizType);
};

// Handle value change
export const onValueChange = (e, state, setState, id) => {
  switch (e.target.name) {
    case 'type':
      switch (id) {
        case 'capital':
          setState({
            ...state,
            type: { ...state.type, capital: !state.type.capital },
          });
          break;
        case 'flag':
          setState({
            ...state,
            type: { ...state.type, flag: !state.type.flag },
          });
          break;
        default:
          break;
      }
      break;
    case 'level':
      switch (e.target.value) {
        case 'VeryEasy':
          setState({ ...state, level: 5 });
          break;
        case 'Easy':
          setState({ ...state, level: 15 });
          break;
        case 'Normal':
          setState({ ...state, level: 30 });
          break;
        case 'Hard':
          setState({ ...state, level: 65 });
          break;
        case 'VeryHard':
          setState({ ...state, level: 100 });
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
};

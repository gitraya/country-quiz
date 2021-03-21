import { useState, useEffect } from 'react';
import Main from './components/Main';
import Footer from './components/Footer';

const App = () => {
  // All countries state
  const [allCountries, setAllCountries] = useState(null);
  const [capitalQuiz, setCapitalQuiz] = useState({
    question: null,
    answer: {
      trueAnswer: null,
      falseAnswer: [],
    },
    option: [],
    alfabet: ['A', 'B', 'C', 'D'],
  });
  // Quiz state
  const [quizState, setQuizState] = useState({
    isTrue: false,
    isFalse: false,
  });

  // Get random number
  const randomNum = function (max) {
    let number = Math.floor(Math.random() * max);
    return number;
  };

  // Shuffle array
  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  // Get unique random number
  function generateUniqueRandom(max, arr) {
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
  }

  // Store and get random new question
  const storeCapitalQuiz = () => {
    setQuizState({ isFalse: false, isTrue: false });

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

  console.log(quizState);
  // Check the answer from user
  const checkAnswer = async (e, answer) => {
    if (answer === capitalQuiz.answer.trueAnswer) {
      await setQuizState({ isFalse: false, isTrue: true });
      return e.target.classList.add('true');
    } else {
      await setQuizState({ isFalse: true, isTrue: false });
      return e.target.classList.add('false');
    }
  };

  const fetchingCountry = async () => {
    await fetch('https://restcountries.eu/rest/v2/all')
      .then((res) => res.json())
      .then((data) => setAllCountries(data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!allCountries) return fetchingCountry();
  });

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${
          process.env.PUBLIC_URL + '/images/background.png'
        })`,
      }}
    >
      <header className="App-header">
        <button onClick={storeCapitalQuiz}>Mulai</button>
      </header>
      <Main
        capitalQuiz={capitalQuiz}
        quizState={quizState}
        checkAnswer={checkAnswer}
      />
      <Footer />
    </div>
  );
};

export default App;

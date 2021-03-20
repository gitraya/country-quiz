import { useState, useEffect } from 'react';

const App = () => {
  const [allCountries, setAllCountries] = useState(null);
  const [capitalQuiz, setCapitalQuiz] = useState({
    question: null,
    answer: {
      trueAnswer: null,
      falseAnswer: [],
    },
  });

  const randomNum = function (max) {
    let number = Math.floor(Math.random() * max) + 1;
    return number;
  };

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

  const storeCapitalQuiz = () => {
    const trueCountry = allCountries[randomNum(250)];
    let falseCountry = [];
    let randArr = [];

    for (let i = 1; i <= 3; i++) {
      let rand = generateUniqueRandom(250, randArr);
      falseCountry.push(allCountries[rand].name);
    }

    const updateCapitalQuiz = {
      question: trueCountry.capital,
      answer: {
        trueAnswer: trueCountry.name,
        falseAnswer: falseCountry,
      },
    };

    setCapitalQuiz(updateCapitalQuiz);
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
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button
          onClick={() => {
            console.log(allCountries);
            storeCapitalQuiz();
          }}
        >
          Klik
        </button>
        <button
          onClick={() => {
            console.log(capitalQuiz);
          }}
        >
          lihat
        </button>
      </header>
      <main></main>
    </div>
  );
};

export default App;

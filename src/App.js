import { useState, useEffect } from 'react';

const App = () => {
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
  const [answerStyles, setAnswerStyles] = useState({
    true: { background: '#EA8282' },
  });

  const randomNum = function (max) {
    let number = Math.floor(Math.random() * max);
    return number;
  };

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
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

  const checkAnswer = (answer) => {
    if (answer === capitalQuiz.answer.trueAnswer) {
      storeCapitalQuiz();
      return console.log(true, 'Kamu benar');
    }
    return console.log(false, 'Kamu salah');
  };

  const answerButtonRender = capitalQuiz.option.map((answer, i) => {
    return (
      <button
        key={i}
        className="answer-button"
        onClick={() => {
          checkAnswer(answer);
        }}
      >
        <div className="wrap-answer">
          <span className="alfa-text">{capitalQuiz.alfabet[i]}</span>
          <span className="answer-text">{answer}</span>
        </div>
        <i>i</i>
      </button>
    );
  });

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
      <main className="App-main">
        <div className="container">
          <h1 className="app-title">country quiz</h1>
          <img
            className="image-onquiz"
            src={process.env.PUBLIC_URL + '/images/undraw_adventure_4hum 1.svg'}
            alt="hero"
          />
          <div className="quiz-card">
            <h2 className="question-text">{`${capitalQuiz.question} is the capital of`}</h2>
            {answerButtonRender}
          </div>
        </div>
      </main>
      <footer className="App-footer">
        <small className="copyright">
          {`created by `}
          <b>
            <a
              href="https://github.com/gitraya"
              target="_blank"
              rel="noreferrer"
            >
              gitraya
            </a>
          </b>
          {`- devChallenges.io`}
        </small>
      </footer>
    </div>
  );
};

export default App;

import { useState, useEffect, useRef } from 'react';
import Main from './Main';
import Footer from './Footer';
import { getQuizQuestion } from '../utils/utils';

const App = () => {
  // state for all countries
  const [allCountries, setAllCountries] = useState(null);

  // state for quiz questions
  const [quizQuestion, setQuizQuestion] = useState({
    question: {
      capital: '',
      flag: '',
    },
    answer: {
      trueAnswer: '',
      falseAnswer: [],
    },
    option: [],
    alfabet: ['A', 'B', 'C', 'D'],
  });

  // state quiz
  const [quizState, setQuizState] = useState({
    startQuiz: false,
    endQuiz: false,
    level: 30,
    stage: 0,
    score: 0,
    type: {
      capital: true,
      flag: false,
    },
    isTrue: false,
    isFalse: false,
  });

  // state whether all question types are active
  const [quizAllType, setQuizAllType] = useState(false);

  // button references
  const buttonRefs = useRef(null);

  // check if the game is over
  const checkQuizEnd = () => {
    const { level, stage } = quizState;

    if (stage === level + 1) {
      setQuizState({
        ...quizState,
        startQuiz: false,
        endQuiz: true,
      });
      return;
    }
  };

  // check if all question types are enabled
  const checkAllTypeQuiz = () => {
    const randBoolean = Math.random() < 0.5;
    if (quizAllType) {
      setQuizState({
        ...quizState,
        type: {
          capital: randBoolean,
          flag: !randBoolean,
        },
        isTrue: false,
        isFalse: false,
      });
    }

    return getQuizQuestion(allCountries, quizQuestion, setQuizQuestion);
  };

  // get questions
  const getQuestion = async () => {
    await setQuizState({
      ...quizState,
      startQuiz: true,
      endQuiz: false,
      isFalse: false,
      isTrue: false,
      stage: (quizState.stage += 1),
    });

    checkAllTypeQuiz();
    checkQuizEnd();
  };

  // check the answers from the users
  const checkAnswer = async (e, answer) => {
    // if the answer is correct
    if (answer === quizQuestion.answer.trueAnswer) {
      await setQuizState({
        ...quizState,
        isFalse: false,
        isTrue: true,
        score: (quizState.score += 1),
      });
      return e.target.classList.add('true');
    } else {
      // if the answer is wrong
      await setQuizState({ ...quizState, isFalse: true, isTrue: false });
      buttonRefs.current.buttonRefs.current.buttonRefs.map((elButton) => {
        if (
          elButton.current.querySelector('.answer-text').innerText ===
          quizQuestion.answer.trueAnswer
        ) {
          elButton.current.querySelector('i').innerText =
            'check_circle_outline';
          return (elButton.current.className = 'answer-button true');
        }
        return elButton;
      });
      return e.target.classList.add('false');
    }
  };

  // reset all
  const resetQuizGame = () => {
    setQuizQuestion({
      question: {
        capital: '',
        flag: '',
      },
      answer: {
        trueAnswer: '',
        falseAnswer: [],
      },
      option: [],
      alfabet: ['A', 'B', 'C', 'D'],
    });
    setQuizState({
      startQuiz: false,
      endQuiz: false,
      level: 30,
      stage: 0,
      score: 0,
      type: {
        capital: true,
        flag: false,
      },
      isTrue: false,
      isFalse: false,
    });
    setQuizAllType(false);
  };

  // retrieve state data
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
  }, [allCountries]);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${
          process.env.PUBLIC_URL + '/images/background.png'
        })`,
      }}
    >
      <Main
        ref={buttonRefs}
        quizState={quizState}
        setQuizState={setQuizState}
        quizQuestion={quizQuestion}
        setQuizQuestion={setQuizQuestion}
        setQuizAllType={setQuizAllType}
        checkAnswer={checkAnswer}
        resetQuizGame={resetQuizGame}
        getQuestion={getQuestion}
      />
      <Footer />
    </div>
  );
};

export default App;

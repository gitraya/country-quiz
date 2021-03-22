import { useState, useEffect, useRef } from 'react';
import Main from './components/Main';
import Footer from './components/Footer';
import { getQuizQuestion } from './utility';

const App = () => {
  // All countries state
  const [allCountries, setAllCountries] = useState(null);

  // State of questions type
  const [capitalQuiz, setCapitalQuiz] = useState({
    question: null,
    answer: {
      trueAnswer: null,
      falseAnswer: [],
    },
    option: [],
    alfabet: ['A', 'B', 'C', 'D'],
  });

  const [flagQuiz, setFlagQuiz] = useState({
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
  const [typeQuiz, setTypeQuiz] = useState('one');

  // Button refs
  const buttonRefs = useRef(null);

  // Check game end
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

  // Get one of type question
  const getOneTypeQuestion = () => {
    const { type } = quizState;

    if (type.capital) {
      return getQuizQuestion(
        allCountries,
        capitalQuiz,
        setCapitalQuiz,
        'capital'
      );
    }
    if (type.flag) {
      return getQuizQuestion(allCountries, flagQuiz, setFlagQuiz, 'flag');
    }
  };

  // Get random type question
  const getRandomAllTypeQuestion = () => {
    const randBool = Math.random() < 0.5;
    setQuizState({
      ...quizState,
      type: {
        capital: randBool,
        flag: !randBool,
      },
    });

    return getOneTypeQuestion();
  };

  // Check type of quiz
  const checkTypeOfQuiz = () => {
    if (typeQuiz === 'all') {
      return getRandomAllTypeQuestion();
    } else {
      return getOneTypeQuestion();
    }
  };

  // Get question
  const getQuestion = () => {
    setQuizState({
      ...quizState,
      startQuiz: true,
      endQuiz: false,
      isFalse: false,
      isTrue: false,
      stage: (quizState.stage += 1),
    });

    checkTypeOfQuiz();
    checkQuizEnd();
  };

  // Check the answer from user
  const checkAnswer = async (e, answer, type) => {
    if (answer === type.answer.trueAnswer) {
      await setQuizState({
        ...quizState,
        isFalse: false,
        isTrue: true,
        score: (quizState.score += 1),
      });

      return e.target.classList.add('true');
    } else {
      await setQuizState({ ...quizState, isFalse: true, isTrue: false });
      buttonRefs.current.buttonRefs.current.buttonRefs.map((elButton) => {
        if (
          elButton.current.querySelector('.answer-text').innerText ===
          type.answer.trueAnswer
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

  // Reset quiz game
  const resetQuizGame = () => {
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
    setTypeQuiz('one');
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
        capitalQuiz={capitalQuiz}
        flagQuiz={flagQuiz}
        quizState={quizState}
        checkAnswer={checkAnswer}
        setQuizState={setQuizState}
        resetQuizGame={resetQuizGame}
        setTypeQuiz={setTypeQuiz}
        getQuestion={() => {
          getQuestion();
        }}
      />
      <Footer />
    </div>
  );
};

export default App;

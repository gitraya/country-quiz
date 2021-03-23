import { useState, useEffect, useRef } from 'react';
import Main from './components/Main';
import Footer from './components/Footer';
import { getQuizQuestion } from './utility';

const App = () => {
  // All countries state
  const [allCountries, setAllCountries] = useState(null);

  // State of questions type
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

  // All type quiz active state
  const [quizAllType, setQuizAllType] = useState(false);

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

  // Check all type quiz is active
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

  // Get question
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

  // Check the answer from user
  const checkAnswer = async (e, answer) => {
    if (answer === quizQuestion.answer.trueAnswer) {
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

  // Reset quiz game
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

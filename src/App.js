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
    level: 30,
    stage: 0,
    type: {
      capital: true,
      flag: false,
    },
    endQuiz: false,
    isTrue: false,
    isFalse: false,
    score: 0,
  });

  // Refs
  const buttonRefs = useRef(null);

  const getQuestion = () => {
    if (quizState.level === quizState.stage) {
      console.log(quizState.score);

      setQuizState({
        startQuiz: false,
        level: 30,
        stage: 0,
        type: {
          capital: true,
          flag: false,
        },
        endQuiz: true,
        isTrue: false,
        isFalse: false,
        score: 0,
      });
      return;
    }

    setQuizState({
      ...quizState,
      startQuiz: true,
      endQuiz: false,
      isFalse: false,
      isTrue: false,
      stage: (quizState.stage += 1),
    });

    if (quizState.type.capital) {
      return getQuizQuestion(
        allCountries,
        capitalQuiz,
        setCapitalQuiz,
        'capital'
      );
    }
    if (quizState.type.flag) {
      return getQuizQuestion(allCountries, flagQuiz, setFlagQuiz, 'flag');
    }
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
        getQuestion={() => {
          getQuestion();
        }}
      />
      <Footer />
    </div>
  );
};

export default App;

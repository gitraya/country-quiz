import { useState, useEffect, useRef } from 'react';
import Main from './components/Main';
import Footer from './components/Footer';
import { storeCapitalQuiz } from './utility';

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
    startQuiz: false,
    endQuiz: false,
    isTrue: false,
    isFalse: false,
    score: 0,
  });

  // Refs
  const buttonRefs = useRef(null);

  // Check the answer from user
  const checkAnswer = async (e, answer) => {
    if (answer === capitalQuiz.answer.trueAnswer) {
      await setQuizState({
        ...quizState,
        isFalse: false,
        isTrue: true,
        score: (quizState.score += 1),
      });
      return e.target.classList.add('true');
    } else {
      await setQuizState({ ...quizState, isFalse: true, isTrue: false });
      buttonRefs.current.buttonRefs.map((elButton) => {
        if (
          elButton.current.querySelector('.answer-text').innerText ===
          capitalQuiz.answer.trueAnswer
        ) {
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
        quizState={quizState}
        checkAnswer={checkAnswer}
        storeCapitalQuiz={() => {
          storeCapitalQuiz(
            allCountries,
            capitalQuiz,
            setCapitalQuiz,
            quizState,
            setQuizState
          );
        }}
      />
      <Footer />
    </div>
  );
};

export default App;

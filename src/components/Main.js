import { forwardRef, useImperativeHandle, useRef } from 'react';
import QuizGame from './QuizGame';
import QuizMenu from './QuizMenu';
import QuizResult from './QuizResult';

const Main = forwardRef(
  (
    {
      capitalQuiz,
      flagQuiz,
      quizState,
      checkAnswer,
      getQuestion,
      setQuizState,
      resetQuizGame,
    },
    ref
  ) => {
    const buttonRefs = useRef(null);

    useImperativeHandle(ref, () => {
      return {
        buttonRefs: buttonRefs,
      };
    });

    return (
      <main className="App-main">
        {quizState.startQuiz ? (
          <QuizGame
            ref={buttonRefs}
            quizState={quizState}
            checkAnswer={checkAnswer}
            capitalQuiz={capitalQuiz}
            flagQuiz={flagQuiz}
            getQuestion={getQuestion}
          />
        ) : quizState.endQuiz ? (
          <QuizResult quizState={quizState} resetQuizGame={resetQuizGame} />
        ) : (
          <QuizMenu
            quizState={quizState}
            setQuizState={setQuizState}
            getQuestion={getQuestion}
          />
        )}
      </main>
    );
  }
);

export default Main;

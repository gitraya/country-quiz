import { forwardRef, useImperativeHandle, useRef } from 'react';
import QuizMenu from 'components/Quiz/QuizMenu';
import QuizGame from 'components/Quiz/QuizGame';
import QuizResult from 'components/Quiz/QuizResult';

const Main = forwardRef(
  (
    {
      quizState,
      setQuizState,
      setQuizAllType,
      quizQuestion,
      checkAnswer,
      getQuestion,
      resetQuizGame,
    },
    ref
  ) => {
    // button references
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
            quizQuestion={quizQuestion}
            checkAnswer={checkAnswer}
            getQuestion={getQuestion}
          />
        ) : quizState.endQuiz ? (
          <QuizResult quizState={quizState} resetQuizGame={resetQuizGame} />
        ) : (
          <QuizMenu
            quizState={quizState}
            setQuizState={setQuizState}
            getQuestion={getQuestion}
            setQuizAllType={setQuizAllType}
          />
        )}
      </main>
    );
  }
);

export default Main;

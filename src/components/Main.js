import { forwardRef, useImperativeHandle, useRef } from 'react';
import QuizGame from './QuizGame';
import QuizMenu from './QuizMenu';

const Main = forwardRef(
  (
    {
      capitalQuiz,
      flagQuiz,
      quizState,
      checkAnswer,
      getQuestion,
      setQuizState,
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

import {
  useEffect,
  useState,
  createRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import AnswerButton from './AnswerButton';

const Main = forwardRef(
  ({ capitalQuiz, quizState, checkAnswer, storeCapitalQuiz }, ref) => {
    const [buttonRefs, setButtonRefs] = useState([]);

    const answerButtonRender = capitalQuiz.option.map((answer, i) => {
      return (
        <AnswerButton
          ref={buttonRefs[i]}
          answer={answer}
          key={i}
          index={i}
          capitalQuiz={capitalQuiz}
          quizState={quizState}
          checkAnswer={checkAnswer}
          disabled={quizState.isTrue || quizState.isFalse ? 'disabled' : null}
        />
      );
    });

    useEffect(() => {
      setButtonRefs((buttonRefs) =>
        Array(capitalQuiz.option.length)
          .fill()
          .map((_, i) => buttonRefs[i] || createRef())
      );
    }, [capitalQuiz.option.length]);

    useImperativeHandle(ref, () => {
      return {
        buttonRefs: buttonRefs,
      };
    });

    return (
      <main className="App-main">
        <div className="container">
          <h1 className="app-title">country quiz</h1>
          <img
            className="image-onquiz"
            src={process.env.PUBLIC_URL + '/images/undraw_adventure_4hum 1.svg'}
            alt="hero"
          />
          <div
            className="quiz-card"
            style={
              quizState.isTrue || quizState.isFalse
                ? { paddingBottom: '1rem' }
                : {}
            }
          >
            <h2 className="question-text">{`${capitalQuiz.question} is the capital of`}</h2>
            {answerButtonRender}
            {quizState.isTrue || quizState.isFalse ? (
              <button
                type="submit"
                className="next-button"
                onClick={() => {
                  storeCapitalQuiz();
                }}
              >
                Next
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </main>
    );
  }
);

export default Main;

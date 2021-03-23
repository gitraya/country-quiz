import {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
  createRef,
} from 'react';
import AnswerButton from '../Button/AnswerButton';

const QuizGame = forwardRef(
  ({ checkAnswer, quizState, quizQuestion, getQuestion }, ref) => {
    // array button refs
    const [buttonRefs, setButtonRefs] = useState([]);

    // create an answer button
    const answerButtonRender = quizQuestion.option.map((answer, i) => {
      return (
        <AnswerButton
          ref={buttonRefs[i]}
          answer={answer}
          key={i}
          index={i}
          quizState={quizState}
          quizQuestion={quizQuestion}
          checkAnswer={checkAnswer}
          disabled={quizState.isTrue || quizState.isFalse ? 'disabled' : null}
        />
      );
    });

    useEffect(() => {
      setButtonRefs((buttonRefs) =>
        Array(quizQuestion.option.length)
          .fill()
          .map((_, i) => buttonRefs[i] || createRef())
      );
    }, [quizQuestion]);

    useImperativeHandle(ref, () => {
      return {
        buttonRefs: buttonRefs,
      };
    });

    return (
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
          <span className="text-stage">
            {quizState.stage}/{quizState.level}
          </span>
          {quizState.type.capital ? (
            <h2 className="question-text">{`${quizQuestion.question.capital} is the capital of`}</h2>
          ) : quizState.type.flag ? (
            <div>
              <img
                src={quizQuestion.question.flag}
                style={{
                  width: '5.5rem',
                  height: 'auto',
                  objectPosition: 'center',
                  objectFit: 'cover',
                }}
                alt="flag"
              />
              <h2 className="question-text">
                Which country does this flag belong to?
              </h2>
            </div>
          ) : (
            ''
          )}
          {answerButtonRender}
          {quizState.isTrue || quizState.isFalse ? (
            <button type="submit" className="next-button" onClick={getQuestion}>
              Next
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
);

export default QuizGame;

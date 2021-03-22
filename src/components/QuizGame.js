import {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
  createRef,
} from 'react';
import AnswerButton from './AnswerButton';

const QuizGame = forwardRef(
  ({ checkAnswer, quizState, capitalQuiz, flagQuiz, getQuestion }, ref) => {
    // Button refs array
    const [buttonRefs, setButtonRefs] = useState([]);

    // Render answer button
    const answerButtonRender = (type) => {
      return type.option.map((answer, i) => {
        return (
          <AnswerButton
            ref={buttonRefs[i]}
            answer={answer}
            key={i}
            index={i}
            capitalQuiz={capitalQuiz}
            flagQuiz={flagQuiz}
            quizState={quizState}
            checkAnswer={checkAnswer}
            disabled={quizState.isTrue || quizState.isFalse ? 'disabled' : null}
          />
        );
      });
    };

    // Set button refs
    const setTypeButtonRefs = (type) => {
      setButtonRefs((buttonRefs) =>
        Array(type.option.length)
          .fill()
          .map((_, i) => buttonRefs[i] || createRef())
      );
    };

    useEffect(() => {
      if (quizState.type.capital) return setTypeButtonRefs(capitalQuiz);
      if (quizState.type.flag) return setTypeButtonRefs(flagQuiz);
    }, [quizState, capitalQuiz, flagQuiz]);

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
            <h2 className="question-text">{`${capitalQuiz.question} is the capital of`}</h2>
          ) : quizState.type.flag ? (
            <div>
              <img
                src={flagQuiz.question}
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
          {quizState.type.capital
            ? answerButtonRender(capitalQuiz)
            : quizState.type.flag
            ? answerButtonRender(flagQuiz)
            : ''}
          {quizState.isTrue || quizState.isFalse ? (
            <button
              type="submit"
              className="next-button"
              onClick={() => {
                getQuestion();
              }}
            >
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

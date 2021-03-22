import { forwardRef } from 'react';

const AnswerButton = forwardRef(
  (
    { answer, index, capitalQuiz, flagQuiz, quizState, checkAnswer, disabled },
    ref
  ) => {
    // Button class
    const buttonClass = `answer-button ${
      !quizState.isTrue && !quizState.isFalse ? ' ' : ''
    }`;

    // Check answer type
    const checkTypeOfAnswer = (e) => {
      if (quizState.type.capital) return checkAnswer(e, answer, capitalQuiz);
      if (quizState.type.flag) return checkAnswer(e, answer, flagQuiz);
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        key={index}
        className={buttonClass}
        onClick={(e) => {
          checkTypeOfAnswer(e);
        }}
      >
        <div className="wrap-answer">
          <span className="alfa-text">
            {quizState.type.capital
              ? capitalQuiz.alfabet[index]
              : quizState.type.flag
              ? flagQuiz.alfabet[index]
              : ''}
          </span>
          <span className="answer-text">{answer}</span>
        </div>
        <i class="material-icons-round">
          {quizState.isTrue
            ? 'check_circle_outline'
            : quizState.isFalse
            ? 'highlight_off'
            : ''}
        </i>
      </button>
    );
  }
);

export default AnswerButton;

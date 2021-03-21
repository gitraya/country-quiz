import { forwardRef } from 'react';

const AnswerButton = forwardRef(
  ({ answer, index, capitalQuiz, quizState, checkAnswer, disabled }, ref) => {
    const buttonClass = `answer-button ${
      !quizState.isTrue && !quizState.isFalse ? ' ' : ''
    }`;

    return (
      <button
        ref={ref}
        disabled={disabled}
        key={index}
        className={buttonClass}
        onClick={(e) => {
          checkAnswer(e, answer);
        }}
      >
        <div className="wrap-answer">
          <span className="alfa-text">{capitalQuiz.alfabet[index]}</span>
          <span className="answer-text">{answer}</span>
        </div>
        <i class="material-icons-round">
          {quizState.isTrue ? 'check_circle_outline' : null}
          {quizState.isFalse ? 'highlight_off' : null}
        </i>
      </button>
    );
  }
);

export default AnswerButton;

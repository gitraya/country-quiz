import { forwardRef } from 'react';

const AnswerButton = forwardRef(
  ({ answer, index, quizQuestion, quizState, checkAnswer, disabled }, ref) => {
    // Button class
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
          <span className="alfa-text">{quizQuestion.alfabet[index]}</span>
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

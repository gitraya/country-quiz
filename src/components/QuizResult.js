const QuizResult = ({ quizState, resetQuizGame }) => {
  return (
    <div className="container">
      <h1 className="app-title">country quiz</h1>
      <div className="quiz-card end">
        <img
          src={process.env.PUBLIC_URL + '/images/undraw_winners_ao2o 2.svg'}
          alt="winners"
        />
        <div className="win-text">
          <h1>Results</h1>
          <p>
            You got <span className="score-text">{quizState.score}</span>{' '}
            correct answers
          </p>
        </div>
        <button className="try-button" type="submit" onClick={resetQuizGame}>
          Try again
        </button>
      </div>
    </div>
  );
};

export default QuizResult;

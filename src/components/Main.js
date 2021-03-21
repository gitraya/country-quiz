import AnswerButton from './AnswerButton';

const Main = ({ capitalQuiz, quizState, checkAnswer }) => {
  const answerButtonRender = capitalQuiz.option.map((answer, i) => {
    return (
      <AnswerButton
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

  return (
    <main className="App-main">
      <div className="container">
        <h1 className="app-title">country quiz</h1>
        <img
          className="image-onquiz"
          src={process.env.PUBLIC_URL + '/images/undraw_adventure_4hum 1.svg'}
          alt="hero"
        />
        <div className="quiz-card">
          <h2 className="question-text">{`${capitalQuiz.question} is the capital of`}</h2>
          {answerButtonRender}
        </div>
      </div>
    </main>
  );
};

export default Main;

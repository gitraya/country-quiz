const QuizMenu = ({ quizState, setQuizState, getQuestion }) => {
  const startGame = () => {
    const {
      startQuiz,
      level,
      type,
      endQuiz,
      isTrue,
      isFalse,
      score,
    } = quizState;
    const { capital, flag } = type;

    if (!capital && !flag) {
      return alert('You must select at least one question type!');
    }
    getQuestion();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    startGame();
  };

  const onValueChange = (e, id) => {
    switch (e.target.name) {
      case 'type':
        switch (id) {
          case 'capital':
            setQuizState({
              ...quizState,
              type: { ...quizState.type, capital: !quizState.type.capital },
            });
            break;
          case 'flag':
            setQuizState({
              ...quizState,
              type: { ...quizState.type, flag: !quizState.type.flag },
            });
            break;
          default:
            break;
        }
        break;
      case 'level':
        switch (e.target.value) {
          case 'VeryEasy':
            setQuizState({ ...quizState, level: 5 });
            break;
          case 'Easy':
            setQuizState({ ...quizState, level: 15 });
            break;
          case 'Normal':
            setQuizState({ ...quizState, level: 30 });
            break;
          case 'Hard':
            setQuizState({ ...quizState, level: 65 });
            break;
          case 'VeryHard':
            setQuizState({ ...quizState, level: 100 });
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <h1 className="app-title">country quiz</h1>
      <div
        className="quiz-card menu"
        style={
          quizState.isTrue || quizState.isFalse ? { paddingBottom: '1rem' } : {}
        }
      >
        <form onSubmit={handleFormSubmit}>
          <div className="form-quiz-type">
            <h2 className="question-text menu">Select the question type?</h2>
            <div className="input-control">
              <input
                id="capital"
                name="type"
                type="checkbox"
                defaultChecked={quizState.type.capital}
                onChange={(e) => {
                  onValueChange(e, 'capital');
                }}
                className="checkbox-quiz"
              />
              <label className="form-label" htmlFor="capital">
                Capital of a country
              </label>
            </div>
            <div className="input-control">
              <input
                id="flag"
                name="type"
                type="checkbox"
                onChange={(e) => {
                  onValueChange(e, 'flag');
                }}
                className="checkbox-quiz"
              />
              <label className="form-label" htmlFor="flag">
                Flag of a country
              </label>
            </div>
          </div>
          <div className="form-quiz-type">
            <h2 className="question-text menu">
              How many questions do you want to play?
            </h2>
            <div className="input-control">
              <input
                className="radio-quiz"
                type="radio"
                name="level"
                id="veryeasy"
                checked={quizState.level === 5}
                onChange={onValueChange}
                value="VeryEasy"
              />
              <label
                className="form-label"
                htmlFor="veryeasy"
              >{`Very Easy (5)`}</label>
            </div>
            <div className="input-control">
              <input
                className="radio-quiz"
                type="radio"
                name="level"
                id="easy"
                checked={quizState.level === 15}
                onChange={onValueChange}
                value="Easy"
              />
              <label className="form-label" htmlFor="easy">{`Easy (15)`}</label>
            </div>
            <div className="input-control">
              <input
                className="radio-quiz"
                type="radio"
                name="level"
                id="normal"
                checked={quizState.level === 30}
                onChange={onValueChange}
                value="Normal"
              />
              <label
                className="form-label"
                htmlFor="normal"
              >{`Normal (30)`}</label>
            </div>
            <div className="input-control">
              <input
                className="radio-quiz"
                type="radio"
                name="level"
                id="hard"
                checked={quizState.level === 65}
                onChange={onValueChange}
                value="Hard"
              />
              <label className="form-label" htmlFor="hard">{`Hard (65)`}</label>
            </div>
            <div className="input-control">
              <input
                className="radio-quiz"
                type="radio"
                name="level"
                id="veryhard"
                checked={quizState.level === 100}
                onChange={onValueChange}
                value="VeryHard"
              />
              <label
                className="form-label"
                htmlFor="veryhard"
              >{`Very Hard (100)`}</label>
            </div>
          </div>
          <button className="start-button" type="submit">
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizMenu;

import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
// import { NEXT_QUESTION, ADD_POINT } from '../../../redux/actions';
import { ADD_POINT } from '../../../redux/actions';
import { getQuestions } from '../../../services/fetches';
import {clear} from '@testing-library/user-event/dist/clear';

class QuestionCard extends React.Component {
  state = {
    API_ER_CODE: 3,
    intervalId: 0,
    isQuestionVisible: false,
    optionsDisabled: false,
    questionTimer: {
      remainingTime: 30,
      visible: false,
    },
    options: [],
  };

  componentDidMount() {
    const { question } = this.props;
    const answers = [...question.incorrect_answers, question.correct_answer];
    const options = this.randomizeAnswers(answers);
    this.setState({ options });
    const waitTime = 5000;
    setTimeout(() => this.questionListener(), waitTime);
  }

  randomizeAnswers = (answrs) => {
    const newAnswersArr = answrs;
    for (let i = answrs.length - 1; i > 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [
        newAnswersArr[i],
        newAnswersArr[randomIndex],
      ] = [newAnswersArr[randomIndex], newAnswersArr[i]];
    }
    return newAnswersArr;
  };

  checkAnswer = ({ target: { id } }) => {
    const { intervalId, questionTimer: { remainingTime } } = this.state;
    clearInterval(intervalId);
    this.disableOptions();
    this.addStyle();
    const { question, dispatch } = this.props;
    if (id === question.correct_answer) {
      console.log('YAY =^.^= KAWAII!!');
      // add css class to btn
      const diffMod = this.getDiffMod(question.difficulty);
      const points = this.calcPoints(diffMod, remainingTime);
      dispatch(ADD_POINT(points));
    } else {
      console.log('TT_TT MOSHI MOSHI DESU NE');
      // if hard mode score--?
    }
  };

  calcPoints = (diffMod, remainingTime) => (10 + (remainingTime * diffMod))

  getDiffMod = (diff) => {
    switch (diff) {
      case 'easy':
        return 1;
      case 'medium':
        return 2;
      case 'hard':
        return 3;
      default:
        return 0;
    }
  }

  addStyle = () => {
    const respostas = document.querySelectorAll('.questao');
    const { question } = this.props;
    respostas.forEach((element) => {
      if (element.id === question.correct_answer) {
        element.className = 'certa';
      } else {
        element.className = 'errada';
      }
      console.log(element);
    });
  };

  verifyToken = async () => {
    const token = localStorage.getItem('token');
    const { API_ER_CODE } = this.state;
    const res = await getQuestions(token);
    if (res.response_code === API_ER_CODE) {
      localStorage.removeItem('token');
      const { history } = this.props;
      history.push('/');
    }
  };

  disableOptions = async () => {
    this.setState({ optionsDisabled: true });
  };

  secPasser = async () => {
    const { intervalId, questionTimer: { remainingTime, visible } } = this.state;
    if (remainingTime === 0) {
      clearInterval(intervalId);
      return;
    }
    this.setState(({ questionTimer }) => ({
      questionTimer: { remainingTime: questionTimer.remainingTime - 1, visible,
      } }));
  };

  questionListener = async () => {
    this.setState({ isQuestionVisible: true });
    const answerTime = 30000;
    const sec = 1000;
    const visible = true;
    this.setState((prev) => ({ questionTimer: { ...prev.questionTimer, visible } }));
    const intervalId = setInterval(() => this.secPasser(), sec);
    this.setState({ intervalId });
    setTimeout(() => this.disableOptions(), answerTime);
  };

  render() {
    const { question } = this.props;
    const {
      isQuestionVisible,
      options,
      optionsDisabled,
      questionTimer: {
        remainingTime,
        visible,
      } } = this.state;
    this.verifyToken();
    return (
      <div style={ { display: (isQuestionVisible ? 'block' : 'none') } }>
        <h1 data-testid="question-text">{ question.question }</h1>
        <h3 data-testid="question-category">{ question.category }</h3>
        <div data-testid="answer-options">
          {
            options.map((option) => (
              <button
                className="options questao"
                type="button"
                onClick={ this.checkAnswer }
                key={ option }
                id={ option }
                data-testid={ option === question.correct_answer
                  ? 'correct-answer'
                  : `wrong-answer-${question.incorrect_answers.indexOf(option)}` }
                disabled={ optionsDisabled }
              >
                {option}
              </button>
            ))
          }
          <span style={ { display: (visible ? 'block' : 'none') } }>{remainingTime}</span>
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  question: Proptypes.shape({
    category: Proptypes.string,
    type: Proptypes.string,
    difficulty: Proptypes.string,
    question: Proptypes.string,
    correct_answer: Proptypes.string,
    incorrect_answers: Proptypes.arrayOf(Proptypes.string),
  }).isRequired,
  dispatch: Proptypes.func.isRequired,
  history: Proptypes.arrayOf().isRequired,
};

const mapStateToProps = ({ play: { question, page, questions } }) => ({
  question,
  page,
  questions,
});

export default connect(mapStateToProps)(QuestionCard);

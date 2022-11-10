import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { ADD_POINT } from '../../../redux/actions';
import { getQuestions } from '../../../services/fetches';

const fixedPoints = 10;
const hardMod = 3;
const mediumMod = 2;
const easyMod = 1;

class QuestionCard extends React.Component {
  state = {
    API_ER_CODE: 3,
  };

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
    const { question, dispatch } = this.props;
    this.addStyle();
    if (id === question.correct_answer) {
      console.log('YAY =^.^= KAWAII!!');
      // add css class to btn
      const diffMod = this.getDiffMod(question.difficulty);
      const points = this.calcPoints(diffMod, remainingTime);
      dispatch(ADD_POINT(points));
    } else {
      console.log(' TT_TT MOSHI MOSHI DESU NE');
      // if hard mode score--?
    }


  };

  calcPoints = (diffMod, remainingTime) => (fixedPoints + (remainingTime * diffMod));

  getDiffMod = (diff) => {
    switch (diff) {
    case 'easy':
      return easyMod;
    case 'medium':
      return mediumMod;
    case 'hard':
      return hardMod;
    default:
      return 0;
    }
  };

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

  render() {
    const { question } = this.props;
    const answers = [...question.incorrect_answers, question.correct_answer];
    const options = this.randomizeAnswers(answers);
    this.verifyToken();
    return (
      <>
        <h1 data-testid="question-text">{ question.question }</h1>
        <h3 data-testid="question-category">{ question.category }</h3>
        <div data-testid="answer-options">
          {
            options.map((option) => (
              <button
                type="button"
                onClick={ this.checkAnswer }
                key={ option }
                id={ option }
                className="questao"
                data-testid={ option === question.correct_answer
                  ? 'correct-answer'
                  : `wrong-answer-${question.incorrect_answers.indexOf(option)}` }
              >
                {option}
              </button>
            ))
          }
        </div>
      </>
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
  history: Proptypes.shape({
    push: Proptypes.func,
  }),
}.isRequired;

const mapStateToProps = ({ play: { question, page, questions } }) => ({
  question,
  page,
  questions,
});

export default connect(mapStateToProps)(QuestionCard);

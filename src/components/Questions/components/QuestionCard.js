import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { NEXT_QUESTION, ADD_POINT } from '../../../redux/actions';

class QuestionCard extends React.Component {
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
    const { question, dispatch, questions, page } = this.props;
    if (id === question.correct_answer) {
      console.log('YAY =^.^= KAWAII!!');
      // add css class to btn
      dispatch(ADD_POINT());
    } else {
      console.log(' TT_TT MOSHI MOSHI DESU NE');
      // if hard mode score--?
    }
    const questionPointer = (page < questions.length - 1 ? page + 1 : 0);
    dispatch(NEXT_QUESTION(questionPointer));
    // dispatch(NEXT_QUESTION((page < questionsLength - 1 ? page + 1 : 0))
  };

  render() {
    const { question } = this.props;
    const answers = [...question.incorrect_answers, question.correct_answer];
    const options = this.randomizeAnswers(answers);
    console.log(question);
    return (
      <>
        <h1>{ question.question }</h1>
        <h3>{ question.category }</h3>
        {
          options.map((option) => (
            <button
              type="button"
              onClick={ this.checkAnswer }
              key={ option }
              id={ option }
            >
              { option }
            </button>
          ))
        }
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
  questions: Proptypes.arrayOf(Proptypes.shape({
    category: Proptypes.string,
    type: Proptypes.string,
    difficulty: Proptypes.string,
    question: Proptypes.string,
    correct_answer: Proptypes.string,
    incorrect_answers: Proptypes.arrayOf(Proptypes.string),
  })).isRequired,
  dispatch: Proptypes.func.isRequired,
  page: Proptypes.number.isRequired,
};

const mapStateToProps = ({ play: { question, page, questions } }) => ({
  question,
  page,
  questions,
});

export default connect(mapStateToProps)(QuestionCard);

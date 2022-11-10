import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import QuestionCard from './components/QuestionCard';
import { NEXT_QUESTION } from '../../redux/actions';

class Questions extends React.Component {
  handleNextQuestion = () => {
    const { dispatch, questions, page, history } = this.props;
    const questionPointer = (page < questions.length - 1 ? page + 1
      : history.push('/feedback'));
    dispatch(NEXT_QUESTION(questionPointer));
  };

  render() {
    const { questions, page, score } = this.props;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.handleNextQuestion }
        >
          next

        </button>
        <QuestionCard question={ questions[page] } />
        <h1>{ `PLACAR: ${score}` }</h1>
      </div>
    );
  }
}

Questions.propTypes = {
  dispatch: Proptypes.func,
  history: Proptypes.shape({
    push: Proptypes.func,
  }),
  page: Proptypes.shape({
  }),
  questions: Proptypes.shape({
    length: Proptypes.number,
  }),
  score: Proptypes.any,
}.isRequired;

const mapStateToProps = ({ play: { questions, page, score } }) => ({
  questions,
  page,
  score,
});

export default compose(withRouter, connect(mapStateToProps))(Questions);

import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import QuestionCard from './components/QuestionCard';
import {DISABLE_NEXT_BTN, NEXT_QUESTION} from '../../redux/actions';

class Questions extends React.Component {
  handleNextQuestion = () => {
    const { dispatch, questions, page, history } = this.props;
    const questionPointer = (page < questions.length - 1 ? page + 1
      : history.push('/feedback'));
    dispatch(NEXT_QUESTION(questionPointer));
    dispatch(DISABLE_NEXT_BTN());
  };

  render() {
    const { questions, page, score, nextBtnEnabled } = this.props;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.handleNextQuestion }
          style={ { display: (nextBtnEnabled ? 'block' : 'none') } }
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
  nextBtnEnabled: Proptypes.bool.isRequired,
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

const mapStateToProps = ({ player: { questions, page, score, nextBtnEnabled } }) => ({
  questions,
  page,
  score,
  nextBtnEnabled,
});

export default compose(withRouter, connect(mapStateToProps))(Questions);

import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import QuestionCard from './components/QuestionCard';

class Questions extends React.Component {
  handleNextQuestion = () => {
    const { questions } = this.props;
    // temp for debug purposes
    this.setState((prev) => ({
      page: prev.page < questions.length - 1 ? prev.page + 1 : 0 }));
  };

  render() {
    const { questions, page, score } = this.props;
    return (
      <div>
        <button type="button" onClick={ this.handleNextQuestion }>next</button>
        <QuestionCard question={ questions[page] } />
        <h1>{ `PLACAR: ${score}` }</h1>
      </div>
    );
  }
}

Questions.propTypes = {
  questions: Proptypes.arrayOf(Proptypes.shape({
    category: Proptypes.string,
    type: Proptypes.string,
    difficulty: Proptypes.string,
    question: Proptypes.string,
    correct_answer: Proptypes.string,
    incorrect_answers: Proptypes.arrayOf(Proptypes.string),
  })).isRequired,
  page: Proptypes.number.isRequired,
  score: Proptypes.number.isRequired,
};

const mapStateToProps = ({ play: { questions, page, score } }) => ({
  questions,
  page,
  score,
});

export default connect(mapStateToProps)(Questions);

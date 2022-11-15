import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { Grid } from '@mui/material';
import QuestionCard from './components/QuestionCard';
import { DISABLE_NEXT_BTN, NEXT_QUESTION } from '../../redux/actions';
import Button from '../Button/Button';

class Questions extends React.Component {

  state = {
    showQuestions: false,
  }

  handleNextQuestion = () => {
    const { dispatch, questions, page, history } = this.props;
    console.log(page);
    const questionPointer = (page < questions.length - 1 ? page + 1
      : history.push('/feedback'));
    dispatch(NEXT_QUESTION(questionPointer));
    dispatch(DISABLE_NEXT_BTN());
  };

  render() {
    const { questions, page, score, nextBtnEnabled } = this.props;
    return (
      <Grid
        container
        spacing={ 3 }
        justifyContent="flex-end"
        alignContent="center"
      >
        <Grid item>
          <QuestionCard question={ questions[page] } />
        </Grid>
        <Grid item xs={ 3 }>
          {
            nextBtnEnabled
              ? (
                <Button
                  className="btn-next"
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.handleNextQuestion }
                  disabled={ !nextBtnEnabled }
                >
                  next >>
                </Button>)
              : null
          }
        </Grid>
      </Grid>
    );
  }
}

Questions.propTypes = {
  nextBtnEnabled: Proptypes.bool.isRequired,
  dispatch: Proptypes.func,
  history: Proptypes.shape({
    push: Proptypes.func,
  }).isRequired,
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

export default connect(mapStateToProps)(Questions);
// export default compose(withRouter, connect(mapStateToProps))(Questions);

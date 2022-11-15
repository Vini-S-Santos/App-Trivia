import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { Typography, Grid, Divider } from '@mui/material';
import { ADD_POINT, ENABLE_NEXT_BTN } from '../../../redux/actions';

import Button from '../../Button/Button';

const fixedPoints = 10;
const hardMod = 3;
const mediumMod = 2;
const easyMod = 1;

class QuestionCard extends React.Component {
  state = {
    intervalId: 0,
    timeoutId: 0,
    isQuestionVisible: false,
    optionsDisabled: false,
    questionTimer: {
      remainingTime: 30,
      visible: false,
    },
    options: [],
  };

  async componentDidMount() {
    const { question } = this.props;
    const answers = [...question.incorrect_answers, question.correct_answer];
    const options = await this.randomizeAnswers(answers);
    this.setState({ options });
    this.questionListener();
  }

  async componentDidUpdate(prevProps /* prevState, snapshot */) {
    const { question } = this.props;
    const { questionTimer: { remainingTime } } = this.state;
    if (question !== prevProps.question) {
      const answers = [...question.incorrect_answers, question.correct_answer];
      const options = await this.randomizeAnswers(answers);
      this.setState({
        options,
        questionTimer: {
          remainingTime: 30,
          visible: true,
        } }, () => {
        this.enableOptions();
        this.questionListener();
      });
    } else {
      if (remainingTime === 0) {
        this.addStyle();
      }
    }
  }

  randomizeAnswers = async (answrs) => {
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

  checkAnswer = async ({ target: { id } }) => {
    const { timeoutId, intervalId, questionTimer: { remainingTime } } = this.state;
    this.enableNextBtn();
    clearInterval(intervalId);
    clearTimeout(timeoutId);
    await this.disableOptions();
    this.addStyle();
    const { question, dispatch } = this.props;
    if (id === question.correct_answer) {
      console.log('YAY =^.^= KAWAII!!');
      const diffMod = this.getDiffMod(question.difficulty);
      const points = this.calcPoints(diffMod, remainingTime);
      dispatch(ADD_POINT(points));
    } else {
      console.log('TT_TT MOSHI MOSHI DESU NE');
    }
  };

  calcPoints = (diffMod, remainingTime) => (fixedPoints + (remainingTime * diffMod));

  getDiffMod = (diff) => {
    switch (atob(diff)) {
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
        element.classList.add('certa');
      } else {
        element.classList.add('errada');
      }
    });
  };

  enableNextBtn = () => {
    const { dispatch } = this.props;
    dispatch(ENABLE_NEXT_BTN());
  };

  /*
  disableNextBtn = () => {
    const { dispatch } = this.props;
    dispatch(DISABLE_NEXT_BTN());
  };
  */

  enableOptions = async () => {
    this.setState({ optionsDisabled: false });
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
    const timeoutId = await setTimeout(async () => {
      await this.disableOptions();
      this.enableNextBtn();
    }, answerTime);
    this.setState({ timeoutId });
  };

  render() {
    const { question, page } = this.props;
    const {
      isQuestionVisible,
      options,
      optionsDisabled,
      questionTimer: {
        remainingTime,
        visible,
      },
    } = this.state;
    return (
      <Grid
        container
        xs={ 12 }
        spacing={ 5 }
        flexDirection="row"
        alignItems="center"
        style={ {
          display: (isQuestionVisible ? 'flex' : 'none'),
          paddingLeft: '70px',
          marginTop: '10px' } }
      >
        <Grid item>
          <Grid container item spacing={ 2 } xs={ 11 } sx={ { paddingLeft: 2 } }>
            <Grid container xs={ 12 } item justifyContent="space-between">
              <Typography
                data-testid="question-category"
              >
                { atob(question.category) }
              </Typography>
              <Typography>{ atob(question.difficulty) }</Typography>
              <Typography>{ `${page + 1}/5` }</Typography>
            </Grid>
            <Grid item>
              <Typography
                className="question-text"
                sx={ { fontWeight: 'bold' } }
                data-testid="question-text"
              >
                { atob(question.question) }
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={ 12 }>
          <Grid
            container
            justifyContent="center"
            flexDirection={ options.length === 2 ? 'row' : 'column' }
            xs={ 12 }
            data-testid="answer-options"
            spacing={ 2 }
          >
            <Grid container spacing={ 2 }>
              {
                options && options.map((option) => (
                  <Grid key={ option } item xs={ 12 } className="box-answers">
                    <Button
                      className="questao"
                      onClick={ this.checkAnswer }
                      key={ option }
                      id={ option }
                      dataTestId={ option === question.correct_answer
                        ? 'correct-answer'
                        : `wrong-answer-${(question.incorrect_answers.indexOf(option))}` }
                      disabled={ optionsDisabled }
                      sx={ { boxShadow: '100px -16px black' } }
                    >
                      <Typography
                        key={ option }
                        sx={ {
                          fontSize: 12,
                          color: '#024d05',
                        } }
                      >
                        {atob(option)}
                      </Typography>
                      <Divider
                        flexItem
                        color="yellow"
                        orientation="horizontal"
                        sx={ { mx: 3, my: 3 } }
                      />
                    </Button>
                  </Grid>
                ))
              }
            </Grid>
            <Grid item xs={ 12 }>
              <Typography
                className="remaining-time"
                sx={ { display: (visible ? 'block' : 'none') } }
              >
                { `${remainingTime} sec` }
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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

const mapStateToProps = ({ player: { question, page, questions } }) => ({
  question,
  page,
  questions,
});

export default connect(mapStateToProps)(QuestionCard);

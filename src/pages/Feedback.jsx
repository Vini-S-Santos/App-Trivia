import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {Grid, Paper, Typography} from '@mui/material';
import Header from '../components/Header/Header';
import { RESET_STATE } from '../redux/actions';
import LOGIN_PATH from './login/login.type';
import Button from '../components/Button/Button';

class Feedback extends React.Component {
  componentDidMount() {
    this.setRanking();
  }

  resetState = () => {
    const { dispatch, history } = this.props;
    dispatch(RESET_STATE());
    history.push(LOGIN_PATH[0]);
  }

  setRanking = () => {
    const { playerScore, playerName, playerEmail } = this.props;
    const playerData = { playerName, playerScore, playerEmail };
    const ranking = localStorage.getItem('ranking');
    if (!ranking) {
      const setData = JSON.stringify([playerData]);
      localStorage.setItem('ranking', setData);
    } else {
      const rank = JSON.parse(ranking);
      rank.push(playerData);
      const newRank = JSON.stringify(rank);
      localStorage.setItem('ranking', newRank);
    }
  };

  render() {
    const { assertNumber, playerScore, history } = this.props;
    const ASSERT_FLOOR = 3;
    return (
      <Grid
        container
        xs={ 12 }
        spacing={ 3 }
        justifyContent="center"
        alignContent="center"
      >
        <Header />
        <Grid
          item
          className="results-container"
          component={ Paper }
          alignContent="center"
          justifyContent="center"
          sx={ {
            width: 500,
            height: 250,
            marginTop: '17%',
            backgroundColor: 'rgba(81,154,82,0.73)',
            marginLeft: 5,
            marginRight: 5,
            boxShadow: 3,
            paddingBottom: 5,
          } }
        >
          <Grid
            container
            spacing={ 3 }
            justifyContent="flex-end"
            alignContent="center"
          >
            <Grid item>
              <Grid
                container
                xs={ 12 }
                spacing={ 5 }
                flexDirection="row"
                alignItems="center"
              >
                <Grid item xs={ 12 }>
                  <Typography sx={ { fontWeight: 'bold' } }>Results</Typography>
                </Grid>
                <Grid item>
                  <Typography data-testid="feedback-text">
                    { assertNumber < ASSERT_FLOOR ? 'Could be better...' : 'Well Done!' }
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography data-testid="feedback-total-question" sx={ { fontWeight: 'bold'} }>
                    { `Hits: ${assertNumber}` }
                  </Typography>
                  <Typography data-testid="feedback-total-score" sx={ { fontWeight: 'bold'} }>
                    { `Score: ${playerScore}` }
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={ 3 } spacing={ 2 } rowGap={ 2 } sx={ { marginTop: 10 } }>
              <Button
                type="button"
                className="btns-flex-end"
                data-testid="btn-ranking"
                onClick={ () => history.push('/ranking') }
                disabled={ false }
              >
                Ranking
              </Button>
              <Button
                type="button"
                className="btns-flex-end"
                data-testid="btn-play-again"
                onClick={ this.resetState }
                disabled={ false }
              >
                Play Again
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
} //

const mapStateToProps = (state) => ({
  assertNumber: state.player.assertions,
  playerScore: state.player.score,
  playerName: state.user.user,
  playerEmail: state.user.email,
});

Feedback.propTypes = {
  assertNumber: PropTypes.number.isRequired,
  playerScore: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feedback);

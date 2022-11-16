import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, Grid, Paper, Typography } from '@mui/material';
import { RESET_STATE } from '../redux/actions';

// Path
import LOGIN_PATH from './login/login.type';

// Components
import Header from '../components/Header/Header';
import Button from '../components/Button/Button';

class Ranking extends Component {
  resetStates = () => {
    const { dispatch, history } = this.props;
    dispatch(RESET_STATE());
    history.push(LOGIN_PATH[0]);
  };

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
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
            height: 'auto',
            marginTop: '10%',
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
            flexDirection="row"
          >
            <Grid item>
              <Grid
                container
                xs={ 12 }
                spacing={ 5 }
                flexDirection="row"
                alignItems="center"
              >
                <Grid item xs={ 12 } sx={ { marginBottom: 5 } }>
                  { /* eslint-disable-next-line */ }
                  <Typography
                    sx={ { fontWeight: 'bold' } }
                    data-testid="ranking-title"
                  >
                    Ranking
                  </Typography>
                </Grid>
                { /* eslint-disable-next-line */ }
                <Grid
                  container
                  flexDirection="column"
                  rowSpacing={ 2 }
                >
                  {ranking
                    .sort((a, b) => b.playerScore - a.playerScore)
                    .map((obj, index) => (
                      <Grid key={ index } item sx={ { display: 'inline-flex' } }>
                        <Grid item>
                          <Avatar
                            sx={ { border: '2px solid yellow', marginRight: 2 } }
                            data-testid="header-profile-picture"
                            src={ `https://www.gravatar.com/avatar/${MD5(obj.playerEmail).toString()}` }
                            alt="Gravatar do usuario"
                          />
                        </Grid>
                        <Grid item>
                          <Typography data-testid={ `player-name-${index}` }>
                            { obj.playerName }
                          </Typography>
                          <Typography data-testid={ `player-score-${index}` }>
                            { `Score: ${obj.playerScore}` }
                          </Typography>
                        </Grid>
                      </Grid>
                    )) }
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={ 5 }
            >
              <Button
                type="button"
                className="btns-flex-end"
                data-testid="btn-go-home"
                onClick={ this.resetStates }
                disabled={ false }

              >
                Voltar a página inicial
              </Button>
            </Grid>
          </Grid>

        </Grid>

      </Grid>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect()(Ranking);

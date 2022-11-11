import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RESET_STATE } from '../redux/actions';

class Ranking extends Component {
  resetStates = () => {
    const { dispatch, history } = this.props;
    dispatch(RESET_STATE());
    history.push('/');
  };

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking
          .sort((a, b) => b.playerScore - a.playerScore)
          .map((obj, index) => (
            <div
              key={ index }
            >
              <img
                src={ `https://www.gravatar.com/avatar/${MD5(obj.playerEmail).toString()}` }
                alt="Gravatar do usuario"
              />
              <span
                data-testid={ `player-name-${index}` }
              >
                { obj.playerName }
              </span>
              <span
                data-testid={ `player-score-${index}` }
              >
                { obj.playerScore}
              </span>
            </div>))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.resetStates }
        >
          Voltar a página inicial
        </button>
      </>
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

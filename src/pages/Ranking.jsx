import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { MD5 } from 'crypto-js';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
    const { history } = this.props;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking
          .sort((a, b) => b.playerScore - a.playerScore)
          .map((obj, index) => (
            <div
              key={ index }
            >
              <span>
                { obj.playerEmail}
              </span>
              <span>
                { obj.playerScore}
              </span>
            </div>))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Voltar a página inicial
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Ranking;

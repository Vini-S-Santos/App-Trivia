import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  componentDidMount() {
    this.setRanking();
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
      <div>
        <Header />
        <h2>Results</h2>
        <p data-testid="feedback-text">
          { assertNumber < ASSERT_FLOOR ? 'Could be better...' : 'Well Done!' }
        </p>
        <p>
          {'Hits: '}
        </p>
        <p data-testid="feedback-total-question">{ assertNumber }</p>
        <p>
          {'Score: '}
        </p>
        <p data-testid="feedback-total-score">{ playerScore }</p>
        <button
          type="button"
          className="feedback-btn"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          className="feedback-btn"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
} //

const mapStateToProps = (state) => ({
  assertNumber: state.player.assertions,
  playerScore: state.player.score,
  playerName: state.user.name,
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
};

export default connect(mapStateToProps)(Feedback);

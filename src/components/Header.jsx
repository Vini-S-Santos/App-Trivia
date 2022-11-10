import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user, email, score } = this.props;
    const userEmail = md5(email).toString();
    return (
      <header>

        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${userEmail}` }
          alt="Gravatar do usuario"
        />

        <p
          data-testid="header-player-name"
        >
          {user}
        </p>

        <span>
          {' '}

        </span>

        <span>
          {email}
        </span>

        <span>
          {' '}

        </span>

        <p
          data-testid="header-score"
        >
          {score}
        </p>

      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  email: state.user.email,
  score: state.play.score,
});

export default connect(mapStateToProps)(Header);

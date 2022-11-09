import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { REGISTER_EMAIL, REGISTER_USER } from '../redux/actions';
import getToken from '../services/fetches';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      nameInput: '',
      emailInput: '',
    };
  }

  validateBtn = () => {
    const { nameInput, emailInput } = this.state;
    const emailCheck = /^.*@.*\.com$/.test(emailInput);
    const nameCheck = nameInput.length >= 1;
    if (emailCheck && nameCheck) {
      return this.setState({ isDisabled: false });
    }
    return this.setState({ isDisabled: true });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(
      {
        [name]: value,
      },
      () => this.validateBtn(),
    );
  };

  playButtonHandler = async () => {
    const { dispatch, history } = this.props;
    const { nameInput, emailInput } = this.state;

    dispatch(REGISTER_EMAIL(emailInput));
    dispatch(REGISTER_USER(nameInput));

    const tokenGenerator = await getToken();
    localStorage.setItem('token', tokenGenerator);

    history.push('/play');
  };

  goToSettings = () => {
    const { history } = this.props;
    history.push('/config');
  };

  render() {
    const {
      nameInput,
      emailInput,
      isDisabled } = this.state;
    return (
      <div>

        <h1> Login </h1>

        <div>

          <label htmlFor="input-user">
            Usuário:
            <input
              type="text"
              id="input-user"
              value={ nameInput }
              name="nameInput"
              placeholder="Digite seu nome de usuário"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="input-email">
            Email:
            <input
              type="email"
              id="input-email"
              value={ emailInput }
              name="emailInput"
              placeholder="Digite seu email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.playButtonHandler }
            disabled={ isDisabled }
          >
            Play

          </button>
        </div>

        <div>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.goToSettings }
          >
            Configurações
          </button>
        </div>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);

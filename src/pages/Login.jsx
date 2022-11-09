import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getToken from '../services/fetches';

export default class Login extends Component {
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
    const { history } = this.props;
    const tokenGenerator = await getToken();
    localStorage.setItem('token', tokenGenerator);
    history.push('/play');
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

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.arrayOf().isRequired,
};
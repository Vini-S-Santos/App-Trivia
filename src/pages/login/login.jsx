import Proptypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getToken, getQuestions } from '../../services/fetches';
import { SET_QUESTIONS, REGISTER_EMAIL, REGISTER_USER } from '../../redux/actions';
import Button from '../../components/Button/Button';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      nameInput: '',
      emailInput: '',
      API_ER_CODE: 3,
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
    const { history, dispatch } = this.props;
    const { nameInput, emailInput, API_ER_CODE } = this.state;
    dispatch(REGISTER_EMAIL(emailInput));
    dispatch(REGISTER_USER(nameInput));
    const tokenGenerator = await getToken();
    const questions = await getQuestions(tokenGenerator);
    if (questions.response_code === API_ER_CODE) {
      localStorage.removeItem('token');
      history.push('/');
      return;
    }
    dispatch(SET_QUESTIONS(questions.results));
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
      isDisabled,
    } = this.state;
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
          <Button
            content="Play"
            onClick={ this.playButtonHandler }
            dataTestId="btn-play"
            disabled={ isDisabled }
          />
        </div>
        <div>
          <Button
            content="Settings"
            type="button"
            data-testid="btn-settings"
            onClick={ this.goToSettings }
            disabled={ false }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  email: state.user.email,
});

Login.propTypes = {
  dispatch: Proptypes.func.isRequired,
  history: Proptypes.shape({
    push: Proptypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Login);

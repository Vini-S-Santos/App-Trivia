import Proptypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Divider, Typography } from '@mui/material';

// Internal Components
import Button from '../../components/Button/Button';
import GridWrapper from '../../components/GridWrapper/GridWrapper';
import TFieldStyled from '../../components/Inputs/TextField/TField.styled';

// Actions/Dispatchers
import {
  SET_QUESTIONS,
  REGISTER_EMAIL,
  REGISTER_USER,
} from '../../redux/actions';

// Api services
import {
  getToken,
  getQuestions,
} from '../../services/fetches';

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
      <GridWrapper
        container
        spacing={ 3 }
        alignContent="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item xs={ 2 } sx={ { display: 'flex' } } justifyContent="center">
          <img
            src="../../trivia.png"
            alt="logo trivia"
            style={ { width: '50%', height: '50%' } }
          />
        </Grid>
        <Grid item xs={ 2 } sx={ { display: 'flex' } } justifyContent="center">
          <TFieldStyled
            type="text"
            variant="standard"
            id="input-user"
            value={ nameInput }
            name="nameInput"
            label="Usuário"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </Grid>
        <Grid item xs={ 2 } sx={ { display: 'flex' } } justifyContent="center">
          <TFieldStyled
            inputProps={ { WebkitBoxShadow: '0 0 0 1000px white inset' } }
            type="email"
            variant="standard"
            id="input-email"
            value={ emailInput }
            name="emailInput"
            label="Email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </Grid>
        <Grid
          item
          xs={ 2 }
          justifyContent="center"
          sx={ {
            display: 'inline-flex',
            marginTop: '25px',
          } }
        >
          <Button
            customWidth="5%"
            onClick={ this.playButtonHandler }
            dataTestId="btn-play"
            disabled={ isDisabled }
            sx={ { boxShadow: '100px -16px black' } }
          >
            <Typography sx={ { fontSize: 12 } }>Play</Typography>
          </Button>
          <Divider
            flexItem
            color="yellow"
            orientation="vertical"
            sx={ { mx: 3, my: 0.01 } }
          />
          <Button
            customWidth="10%"
            type="button"
            data-testid="btn-settings"
            onClick={ this.goToSettings }
            disabled={ false }
          >
            <Typography sx={ { fontSize: 12 } }>Settings</Typography>
          </Button>
        </Grid>
      </GridWrapper>
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

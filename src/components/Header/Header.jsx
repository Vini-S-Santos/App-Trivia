import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Avatar,
  Box,
  Divider,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';
import HeaderStyled from './Header.styled';

class Header extends Component {
  render() {
    const { user, email, score } = this.props;
    const userEmail = md5(email).toString();
    return (
      <HeaderStyled alignItems="center">
        <Container sx={ { display: { xs: '12', md: 'flex' } } }>
          <Grid
            container
            alignContent="center"
          >
            <img
              data-testid="header-profile-picture"
              src="../../trivia.png"
              alt="Trivia logo"
              style={ { width: '23%', height: '70%' } }
            />
          </Grid>
          <Toolbar justifyContent="flex-end" flexWrap="wrap" sx={ { width: '75%' } }>
            <Box
              alignItems="center"
              sx={ { flexgrow: 1, display: { xs: 'flex', md: 'flex' } } }
            >
              <Avatar
                sx={ { border: '2px solid yellow', marginRight: 2 } }
                data-testid="header-profile-picture"
                src={ `https://www.gravatar.com/avatar/${userEmail}` }
                alt="Gravatar do usuario"
              />
              <Typography data-testid="header-currency-field">{ user }</Typography>
              <Divider
                flexItem
                color="yellow"
                orientation="vertical"
                sx={ { mx: 3, my: 0.01 } }
              />
              <Typography data-testid="total-field">{ email }</Typography>
              <Divider
                flexItem
                color="yellow"
                orientation="vertical"
                sx={ { mx: 3, my: 0.01 } }
              />
              <Typography data-testid="email-field">{ `Score: ${score}`}</Typography>
            </Box>
          </Toolbar>
        </Container>
      </HeaderStyled>
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
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);

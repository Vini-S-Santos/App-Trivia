import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Grid, Paper } from '@mui/material';
import Questions from '../../components/Questions/Questions';
import { getQuestions } from '../../services/fetches';
import Header from '../../components/Header/Header';

class Play extends Component {
  state = {
    API_ER_CODE: 3,
    showQuestions: false,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const { API_ER_CODE } = this.state;
    const res = await getQuestions(token);
    if (res.response_code === API_ER_CODE) {
      localStorage.removeItem('token');
      const { history } = this.props;
      history.push('/');
    } else {
      const waitTime = 5000;
      setTimeout(()=>this.setState({ showQuestions: true }), waitTime);
    }
  }

  render() {
    const { history } = this.props;
    const { showQuestions } = this.state;
    return (
      <Grid
        container
        xs={ 12 }
        alignContent="center"
        justifyContent="center"
      >
        <Header />
        {
          showQuestions
            ? (<Grid
              item
              className="play-questions-container"
              component={ Paper }
              alignContent="center"
              justifyContent="center"
              sx={ {
                maxWidth: 700,
                minWidth: 500,
                minHeight: 500,
                maxHeight: 700,
                marginTop: '8%',
                backgroundColor: 'rgba(81,154,82,0.73)',
                marginLeft: 5,
                marginRight: 5,
                boxShadow: 3,
                paddingBottom: 5,
              } }
            >
              <Questions { ...this.props } />
            </Grid>)
            : null
        }

      </Grid>
    );
  }
}

Play.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func,
  }),
}.isRequired;

export default Play;

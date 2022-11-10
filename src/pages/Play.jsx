import { Component } from 'react';
import Proptypes from 'prop-types';
import Questions from '../components/Questions/Questions';
import { getQuestions } from '../services/fetches';

class Play extends Component {
  state = {
    API_ER_CODE: 3,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const { API_ER_CODE } = this.state;
    const res = await getQuestions(token);
    if (res.response_code === API_ER_CODE) {
      const { history } = this.props;
      history.push('/');
    }
  }

  render() {
    return (
      <>
        <h1>Jogatina</h1>
        <Questions />
      </>
    );
  }
}

Play.propTypes = {
  history: Proptypes.arrayOf().isRequired,
};

export default Play;

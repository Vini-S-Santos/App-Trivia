import { Component } from 'react';
import { getQuestions } from '../services/fetches';

export default class Play extends Component {

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const questions = await getQuestions(token);
    console.log(questions);
  }

  render() {
    return (
      <h1>Jogatina</h1>
    );
  }
}

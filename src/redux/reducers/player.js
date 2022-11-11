import {
  ACT_NEXT_QUESTION, ACT_SET_QUESTIONS, ADD_POINT_TO_SCORE,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  question: {},
  page: 0,
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ACT_SET_QUESTIONS:
    return { ...state, questions: [...payload], question: payload[state.page] };
  case ACT_NEXT_QUESTION:
    return { ...state, page: payload, question: state.questions[payload] };
  case ADD_POINT_TO_SCORE:
    return { ...state,
      score: state.score + payload.pointsToAdd,
      assertions: state.assertions + 1 };
  default:
    return { ...state };
  }
};

export default player;
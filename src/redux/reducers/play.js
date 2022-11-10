import {
  ACT_SET_QUESTIONS,
  ACT_NEXT_QUESTION,
  ADD_POINT_TO_SCORE,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  question: {},
  page: 0,
  score: 0,
};

const play = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ACT_SET_QUESTIONS:
    return { ...state, questions: [...payload], question: payload[state.page] };
  case ACT_NEXT_QUESTION:
    return { ...state, page: payload, question: state.questions[payload] };
  case ADD_POINT_TO_SCORE:
    return { ...state, score: state.score + 1 };
  default:
    return { ...state };
  }
};

export default play;

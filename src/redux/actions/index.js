export const ACT_SET_QUESTIONS = 'SET_QUESTIONS';
export const ACT_NEXT_QUESTION = 'NEXT_QUESTION';
export const ADD_POINT_TO_SCORE = 'ADD_POINT';

const REGISTER_EMAIL = (registeredEmail) => ({
  type: 'REGISTER_EMAIL',
  payload: registeredEmail,
});

const REGISTER_USER = (registeredUser) => ({
  type: 'REGISTER_USER',
  payload: registeredUser,
});

const SET_QUESTIONS = (questions) => ({
  type: ACT_SET_QUESTIONS,
  payload: questions,
});

const NEXT_QUESTION = (questionIndex) => ({
  type: ACT_NEXT_QUESTION,
  payload: (questionIndex),
});

const ADD_POINT = (pointsToAdd) => ({
  type: ADD_POINT_TO_SCORE,
  payload: { pointsToAdd },
});

export {
  REGISTER_EMAIL,
  REGISTER_USER,
  SET_QUESTIONS,
  NEXT_QUESTION,
  ADD_POINT,
};

const INIIAL_STATE = {
  score: 0,
};

const score = (state = INIIAL_STATE, { type, payload }) => {
  switch (type) {
  default:
    return { ...state, payload };
  }
};

export default score;

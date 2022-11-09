const INIIAL_STATE = {
  user: '',
  email: '',
};

const user = (state = INIIAL_STATE, { type, payload }) => {
  switch (type) {
  case 'REGISTER_EMAIL':
    return { ...state, email: payload };

  case 'REGISTER_USER':
    return { ...state, user: payload };

  default:
    return { ...state };
  }
};

export default user;

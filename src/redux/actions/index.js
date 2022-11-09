const REGISTER_EMAIL = (registeredEmail) => ({
  type: 'REGISTER_EMAIL',
  payload: registeredEmail,
});

const REGISTER_USER = (registeredUser) => ({
  type: 'REGISTER_USER',
  payload: registeredUser,
});

export {
  REGISTER_EMAIL,
  REGISTER_USER,
};

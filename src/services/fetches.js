export const getToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(URL);
  const response = await request.json();
  return response.token;
};

export const getQuestions = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const res = await fetch(URL);
  return res.json();
};

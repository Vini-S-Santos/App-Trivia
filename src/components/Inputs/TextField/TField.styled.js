import styled from 'styled-components';
import { TextField } from '@mui/material';

const white = 'white';

const TFieldStyled = styled(TextField)({
  '-webkit-text-fill-color': `${white} !important`,
  'caret-color': `${white} !important`,
  '& label': {
    color: white,
  },
  '&& .MuiInput-root:hover::before': {
    borderBottomColor: '#cbe000',
  },
  '&& .MuiInput-root:hover::after': {
    borderBottomColor: '#cbe000',
  },
  '& .MuiInput-underline:before': {
    color: white,
    borderBottomColor: '#b3c500',
  },
  '& label.Mui-focused': {
    color: '#b3c500',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#b3c500',
  },
  width: '25%',
  input: {
    '&:-webkit-autofill': {
      transition: 'background-color 5000s ease-in-out 0s',
      '-webkit-text-fill-color': `${white} !important`,
      // WebkitBoxShadow: `0 0 0 1000px #185700C1 inset`
    },
  },
});

export default TFieldStyled;

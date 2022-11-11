import styled from 'styled-components';
import { TextField } from '@mui/material';

const TFieldStyled = styled(TextField)({
  '& label.Mui-focused': {
    color: '#b3c500',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#b3c500',
  },
  input: {
    "&:-webkit-autofill": {
        transition: 'background-color 5000s ease-in-out 0s',
      '-webkit-text-fill-color': 'black !important',
      //WebkitBoxShadow: `0 0 0 1000px #185700C1 inset`
    }
  }

});

export default  TFieldStyled;

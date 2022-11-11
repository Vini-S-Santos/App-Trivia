import styled from 'styled-components';
import { Button } from '@mui/material';

const ButtonStyled = styled(Button)`
  color: #FFFFFF;
  width: 33%;    
  border-radius: 5px;
  border: 0;
  &:enabled {
    background-color: #b3c500;

    &:hover {
      background-color: #cbe000 !important;
    }
  }

  &:disabled {
    background-color: #989a51 !important;
  }
`;

export default ButtonStyled;

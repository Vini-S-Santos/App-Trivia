import styled from 'styled-components';
import { Button } from '@mui/material';

const ButtonStyled = styled(Button)`
  color: #FFFFFF;
  font-size: 15px;
  width: ${(props) => props.customWidth};
  height: 6vh;  
  //font-size: 10em;
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

import styled from 'styled-components';
import { Button } from '@mui/material';

const ButtonStyled = styled(Button)`
  color: #FFFFFF;
  width: 100%;
  padding: 9px;
  margin: 0 0 22px;
  border-radius: 5px;
  border: 0;

  &:enabled {
    background-color: #032b91;

    &:hover {
      background-color: rgba(35, 61, 218, 0.83) !important;
    }
  }

  &:disabled {
    background-color: #92b6f5;
  }
`;

export default ButtonStyled;

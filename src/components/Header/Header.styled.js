import styled from 'styled-components';
import { AppBar } from '@mui/material';

const HeaderStyled = styled(AppBar)`
  position: static;
  background-color: #519a52 !important;
  height: 10vh;
  min-height: 2em !important;
  flex-direction: row !important;
  justify-content: flex-end !important;
  align-items: center !important;  
  width: 100% !important;
`;

export default HeaderStyled;

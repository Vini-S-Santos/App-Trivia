import React from 'react';
import Proptypes from 'prop-types';
import GWrapperStyled from './GridWrapper.styled';

function GridWrapper({
  container,
  alignContent,
  justifyContent,
  children,
  direction,
  spacing,
}) {
  return (
    <GWrapperStyled
      container={ container }
      spacing={ spacing }
      alignContent={ alignContent }
      justifyContent={ justifyContent }
      direction={ direction }
    >
      { children }
    </GWrapperStyled>
  );
}

GridWrapper.propTypes = {
  container: Proptypes.bool,
  alignContent: Proptypes.string,
  justifyContent: Proptypes.string,
  children: Proptypes.node.isRequired,
  direction: Proptypes.string,
  spacing: Proptypes.number,
};

GridWrapper.defaultProps = {
  container: true,
  alignContent: '',
  justifyContent: '',
  direction: 'column',
  spacing: 2,
};

export default GridWrapper;

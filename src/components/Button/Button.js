import React from 'react';
import Proptypes from 'prop-types';
import ButtonStyled from './Button.styled';

class Button extends React.Component {
  render() {
    const { content, onClick, dataTestId, disabled, className, id, name } = this.props;
    return (
      <ButtonStyled
        id={ id }
        type="button"
        className={ className }
        onClick={ onClick }
        data-testid={ dataTestId }
        disabled={ disabled }
        name={ name }
        variant="contained"
      >
        { content }
      </ButtonStyled>
    );
  }
}

Button.propTypes = {
  content: Proptypes.string.isRequired,
  onClick: Proptypes.func,
  dataTestId: Proptypes.string,
  disabled: Proptypes.bool,
  className: Proptypes.string,
  id: Proptypes.string,
  name: Proptypes.string,
};

Button.defaultProps = {
  disabled: true,
  dataTestId: '',
  id: undefined,
  className: '',
  onClick: () => {},
  name: undefined,
};

export default Button;

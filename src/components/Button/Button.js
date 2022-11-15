import React from 'react';
import Proptypes from 'prop-types';
import ButtonStyled from './Button.styled';

class Button extends React.Component {
  render() {
    const {
      children,
      onClick,
      dataTestId,
      disabled,
      className,
      id,
      name,
      customWidth,
    } = this.props;
    return (
      <ButtonStyled
        customWidth={ customWidth }
        id={ id }
        type="button"
        className={ className }
        onClick={ onClick }
        data-testid={ dataTestId }
        disabled={ disabled }
        name={ name }
        variant="contained"
      >
        { children }
      </ButtonStyled>
    );
  }
}

Button.propTypes = {
  children: Proptypes.node.isRequired,
  customWidth: Proptypes.string,
  disabled: Proptypes.bool,
  dataTestId: Proptypes.string,
  id: Proptypes.string,
  className: Proptypes.string,
  onClick: Proptypes.func,
  name: Proptypes.string,
};

Button.defaultProps = {
  customWidth: '100%',
  disabled: true,
  dataTestId: '',
  id: undefined,
  className: '',
  onClick: () => {},
  name: undefined,
};

export default Button;

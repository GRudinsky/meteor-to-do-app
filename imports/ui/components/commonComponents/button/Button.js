import React from 'react';
import './Button.scss';

export const Button = ({ ...props }) => {
  const { clickHandler, disabled, id, secondary, text } = props;
  const modifierClass = secondary ? 'secondary' : 'primary';

  return (
    <>
      <button
        id={ id }
        className={ `button button--${ modifierClass }` }
        onClick={ clickHandler }
        disabled={ disabled }
      >
        { text }
      </button>
    </>
  );
};

export default Button;

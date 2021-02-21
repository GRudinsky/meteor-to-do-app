import React from 'react';
import './InputText.scss';

const InputText = ({ id, type, value, placeholder, changeHandler, required }) => {
  return (
    <input className="input-text"
      id = { id }
      type = { type }
      value = { value }
      placeholder = { placeholder }
      onChange = { changeHandler }
      required = { required }
    />
  );
};

export default InputText;

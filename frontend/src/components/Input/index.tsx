import React from 'react';
import { InputProps } from '../../interfaces/Input';

// import { Container } from './styles';

const Input = ({ label, placeholder, value, onChange, onKeyDown }: InputProps) => {
  return (
    <div className="">
      <input
        type="text"
        id={label}
        onKeyDown={onKeyDown}
        value={value}
        onChange={onChange}
        className={`border text-xl h-15 border-gray text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5`}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Input;

import React from 'react';

// import { Container } from './styles';
interface InputProps{
  label:string;
  placeholder:string;
}

const Input = ({label,placeholder}:InputProps) => {
  
  return (
    <div className=''>
      <input type="text" id={label} className={`border text-xl h-15 border-gray text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5`} placeholder={placeholder}required />
    </div>
  )
}

export default Input;
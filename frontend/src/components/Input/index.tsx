import React from 'react';

// import { Container } from './styles';
interface InputProps{
  label:string;
  placeholder:string;
}

const Input = ({label,placeholder}:InputProps) => {
  
  return (
    <div className=''>
      <label htmlFor={label} className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">{label}</label>
      <input type="text" id={label} className=" border h-20 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-900 focus:border-red-500 block w-full p-2.5" placeholder={placeholder}required />
    </div>
  )
}

export default Input;
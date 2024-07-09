import React, { ReactNode } from 'react';
import Input from '../Input';
import { InputProps } from '../../interfaces/Input';
import { Link } from 'react-router-dom';

// import { Container } from './styles';
interface NavBarProps {
  children: ReactNode;
}

const NavBar = ({ children }: NavBarProps) => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 items-center">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/"><div className="flex items-center space-x-3 rtl:space-x-reverse ">
          <img
            src="/logo.png"
            width={48}
            loading='lazy'
            height={48}
            className="rounded-lg"
            alt="Gallery Youtube Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hidden lg:block">
            Gallery Youtube
          </span>
        </div>
        </Link>
        <div className="w-9/12">{children}</div>
      </div>
    </nav>
  );
};

export default NavBar;

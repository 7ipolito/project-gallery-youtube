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
            src="https://github.com/7ipolito/project-gallery-youtube/assets/45522944/7dfc7a5b-541d-42e1-84ee-8b60eeff5527"
            className="h-12 "
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

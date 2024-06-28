import React from 'react';
import Input from '../Input';

// import { Container } from './styles';

const NavBar= () => {
  return (
<nav className="bg-white border-gray-200 dark:bg-gray-900 items-center">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a className="flex items-center space-x-3 rtl:space-x-reverse ">
        <img src="https://avatars.githubusercontent.com/u/128262168?s=200&v=4" className="h-11 rounded-full" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hidden lg:block">Gallery Youtube</span>
    </a>
    <div className='w-9/12'>
      <Input label={"PlaylistId"} placeholder={"Search by playlistId"}/>
    </div>
  </div>
</nav>

  )
}

export default NavBar;
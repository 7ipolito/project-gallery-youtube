import { ReactNode, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import Input from '../Input';
import { api } from '@/api/axios';
import { putVideosSearched } from '@/store/reducers/videos';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { getVideos } from '@/store/actions/actions';

// import { Container } from './styles';
// interface NavBarProps {
//   children: ReactNode;
// }

const NavBar = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      dispatch(getVideos(searchValue));
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 items-center ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="/logo.svg"
              width={48}
              loading="lazy"
              height={48}
              className="rounded-lg "
              alt="Gallery Youtube Logo"
            />
            <Label className="cursor-pointer self-center text-2xl font-bold lg:block whitespace-nowrap hidden font-robotoBold">
              Gallery Youtube
            </Label>
          </div>
        </Link>
        <div className="max-w-screen-lg w-9/12">
          <Input
            className="h-12 text-xl font-roboto"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={searchValue}
            placeholder={'Search by playlistId or from videos in database.'}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

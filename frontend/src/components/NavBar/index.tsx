import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { api } from '@/api/axios';
import { putVideosSearched } from '@/store/reducers/videos';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { getInitialVideos, getVideos } from '@/store/actions/videos';
import { Input } from '../ui/input';

// import { Container } from './styles';
// interface NavBarProps {
//   children: ReactNode;
// }

const NavBar = () => {
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    if (initialized && searchValue.trim() === '') {
      dispatch(getInitialVideos());
    }
  }, [dispatch, initialized, searchValue]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setInitialized(true);
      searchVideos();
    }
  };

  const searchVideos = () => {
    if (searchValue.trim() !== '') {
      const data = {
        searchValue,
        navigate: navigate, // Substitua com o valor correto ou remova se não for necessário
      };
      dispatch(getVideos(data));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
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
            placeholder={'Press enter to search by playlistId or by video name.'}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

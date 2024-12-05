import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { getInitialVideos, getVideos } from '@/store/actions/videos';
import { Input } from '../ui/input';
import useTheme from '@/hooks/useTheme';
import { Logo } from './logo';
import { isMobile } from '@/utils/utils';

const NavBar = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggle } = useTheme();

  const [initialized, setInitialized] = useState(false);
  const dispatch: AppDispatch = useDispatch();

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
        navigate: navigate,
      };
      dispatch(getVideos(data));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 items-center">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Logo imagePath={isDarkMode ? '/logo-dark.svg' : '/logo.svg'} />
            <Label className="cursor-pointer text-dark dark:text-white self-center text-2xl font-bold lg:block whitespace-nowrap hidden font-robotoBold">
              Gallery Youtube
            </Label>
          </div>
        </Link>
        <div className="max-w-screen-lg w-9/12">
          <Input
            role="search"
            className="h-12 text-xl font-roboto dark:text-white"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={searchValue}
            placeholder={'Press enter to search by playlistId or by video name.'}
          />
        </div>
        {!isMobile() && (
          <div onClick={toggle}>
            <img
              className="rounded-lg"
              src={isDarkMode ? '/moon.png' : '/sun.png'}
              width={48}
              height={48}
              loading="lazy"
              alt="Dark mode"
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

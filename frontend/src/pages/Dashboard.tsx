import { useCallback, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import PlayerYoutube from '../components/PlayerYoutube';
import { api } from '../api/axios';
import { AxiosRequestConfig } from 'axios';
import { Video } from '../interfaces/Video';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../components/Input';
import YoutubeItem from '../components/YoutubeItem';

function Dashboard() {
  const [searchValue, setSearchValue] = useState('');
  const [videoSelected, setVideoSelected] = useState<Video>();
  const [videos, setVideos] = useState<Video[]>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getVideos = useCallback(async () => {
    if (searchValue.trim()) {
      try {
        const response = await api.post('/videos/findbyPlaylistId', { playlistId: searchValue });
        if (response.data[0].videoId) {
          setVideos(response.data);
          setVideoSelected(response.data[0]);
        } else {
          throw new Error();
        }
      } catch (error) {
        console.log();
        toast.error('Something went wrong', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    }
  }, [searchValue]);

  useEffect(() => {
    console.log(searchValue);
    getVideos();
  }, [getVideos, searchValue]);

  return (
    <div className="min-h-screen flex flex-col m-4">
      <ToastContainer />

      <NavBar>
        <Input onChange={handleChange} value={searchValue} label={'PlaylistId'} placeholder={'Search by playlistId'} />
      </NavBar>
      <div className="flex items-center justify-center">{/* <PlaylistItem /> */}</div>
      <div className="w-full flex items-center justify-center">
        {videos ? (
          <PlayerYoutube video={videoSelected!}>
            {videos
              ?.filter((video) => video.videoId != videoSelected!.videoId)!
              .map((video) => <YoutubeItem key={video.videoId} onPress={(e) => setVideoSelected(e)} video={video!} />)}
          </PlayerYoutube>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-2xl">Welcome to gallery youtube, search something</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

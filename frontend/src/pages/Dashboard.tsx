import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import PlayerYoutube from '../components/PlayerYoutube';
import { api } from '../api/axios';
import { AxiosRequestConfig } from 'axios';
import { Video } from '../interfaces/Video';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../components/Input';
import YoutubeItem from '../components/YoutubeItem';

function Dashboard() {
  const [searchValue, setSearchValue] = useState('');
  const [idVideo, setIdVideo] = useState('');
  const [videos, setVideos] = useState<Video[]>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    console.log(searchValue);

    if (searchValue.trim()) {
      api
        .post('/videos/findbyPlaylistId', { playlistId: searchValue })
        .then((r) => {
          setVideos(r.data);
          setIdVideo(r.data[0].videoId);
        })
        .catch((err) => {
          toast('🦄 Wow so easy!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        });
    }
  }, [searchValue, idVideo]);

  return (
    <div className="min-h-screen flex flex-col m-4">
      <NavBar>
        <Input onChange={handleChange} value={searchValue} label={'PlaylistId'} placeholder={'Search by playlistId'} />
      </NavBar>
      <div className="flex items-center justify-center">{/* <PlaylistItem /> */}</div>
      <div className="w-full flex items-center justify-center">
        {videos ? (
          <PlayerYoutube
            videoId={idVideo}
            title={videos![0].title}
            description={videos![0].description}
            thumbnails={videos![0].thumbnails}
            playlistId={videos![0].playlistId}
            publishedAt={videos![0].publishedAt}
          >
            {videos
              ?.filter((video) => video.videoId != idVideo)!
              .map((video) => <YoutubeItem key={video.videoId} thumbnail={video.thumbnails.high.url} />)}
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

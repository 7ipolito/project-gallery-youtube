import { useCallback, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import PlayerYoutube from '../components/PlayerYoutube';
import { api } from '../api/axios';
import { Video } from '../interfaces/Video';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../components/Input';
import ThumbnailItem from '../components/ThumbnailItem';
import YoutubeItem from '../components/YoutubeItem';

function Dashboard() {
  const [searchValue, setSearchValue] = useState('');
  const [videoSelected, setVideoSelected] = useState<Video | null>();
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [allVideosDatabase, setAllVideosDatabase] = useState<Video[] | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      getVideos();
      // setVideos(null);
      // setVideoSelected(null);
    }
  };

  const getInitialVideos = useCallback(async () => {
    try {
      const response = await api.get('/videos/findAllVideos');
      if (response.data[0].videoId) {
        setAllVideosDatabase(response.data);
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
  }, []);

  const getVideos = useCallback(
    async (video?: Video, search?: string) => {
      console.log(video);
      console.log(searchValue.trim());
      if (searchValue.trim() || search || video) {
        try {
          const response = await api.post('/videos/findbyPlaylistId', { playlistId: searchValue || search });

          if (response.data[0].videoId) {
            if (video) {
              setVideos(response.data);
              setVideoSelected(video);
            } else {
              setVideos(response.data);
              setVideoSelected(response.data[0]);
            }
          } else {
            throw new Error();
          }
        } catch (error) {
          try {
            const filteredVideos = allVideosDatabase?.filter((video) =>
              video.title.toLowerCase().includes(searchValue.toLowerCase()),
            );
            if (filteredVideos[0].videoId) {
              setAllVideosDatabase(filteredVideos);
            } else {
              throw new Error();
            }
          } catch (error) {
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
      } else {
        getInitialVideos();
        // setVideoSelected(allVideosDatabase ? allVideosDatabase[0] : null);
      }
    },
    [allVideosDatabase, getInitialVideos, searchValue],
  );

  useEffect(() => {
    console.log(searchValue);
    getInitialVideos();
  }, [getInitialVideos, searchValue]);

  return (
    <div>
      <ToastContainer />

      <NavBar>
        <Input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={searchValue}
          label={'PlaylistId'}
          placeholder={'Search by playlistId or from videos in database  '}
        />
      </NavBar>
      <div className="min-h-screen flex flex-col m-4 max-w-screen-xl flex-wrap items-center justify-between mx-auto p-4">
        <div className="w-full flex items-center justify-center">
          {videoSelected && videos ? (
            <PlayerYoutube video={videoSelected!}>
              {videos
                .filter((video) => video.videoId != videoSelected!.videoId)!
                .map((video) => (
                  <ThumbnailItem key={video.videoId} onPress={(e) => setVideoSelected(e)} video={video!} />
                ))}
            </PlayerYoutube>
          ) : (
            allVideosDatabase && (
              <div className="w-full flex flex-col ">
                <p className="text-4xl font-bold pb-4">Videos added in database</p>
                {allVideosDatabase.map((video: Video) => (
                  <YoutubeItem
                    key={video.videoId}
                    onPress={(e) => {
                      setSearchValue(e.playlistId);

                      setVideoSelected(e);
                      getVideos(e, e.playlistId);
                    }}
                    video={video}
                  />
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

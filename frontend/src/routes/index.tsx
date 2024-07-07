import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Playlist from "../pages/Playlist";
import NotFound from "../pages/NotFound";
import NavBar from "../components/NavBar";
import Input from "../components/Input";
import { useCallback, useEffect, useState } from "react";
import { Video } from "../interfaces/Video";
import { toast } from "react-toastify";
import { api } from "../api/axios";

 function App(){
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
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

  useEffect(()=>{
    getInitialVideos()
  },[getInitialVideos])

  

  const getVideos = useCallback(
    async ( search?: string) => {
      
      console.log(searchValue.trim());
      if (searchValue.trim() || search ) {
        try {
          const response = await api.post('/videos/findbyPlaylistId', { playlistId: searchValue || search });

          if (response.data[0].videoId) {
              navigate(`/playlist?playlistId=${searchValue}`);
              // setVideos(response.data);
              // setVideoSelected(response.data[0]);
          
          } else {
            throw new Error();
          }
        } catch (error) {
          try {
            const filteredVideos = allVideosDatabase?.filter((video) =>
              video.title.toLowerCase().includes(searchValue.toLowerCase()),
            );
            if (filteredVideos![0].videoId) {
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
    [allVideosDatabase, getInitialVideos, navigate, searchValue],
  );
  return(
    <>
  


   
    <NavBar>
      <Input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={searchValue}
        label={'PlaylistId'}
        placeholder={'Search by playlistId or from videos in database  '}
      />
    </NavBar>
    <Routes>
      <Route path="/" element={<Dashboard videos={allVideosDatabase}/>}/>
      <Route path="/playlist/:playlistId" element={<Playlist/>}/>
      <Route path="*" element={<NotFound/>}/>

    </Routes>
  </>
  )
}

export default App;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Playlist from "../pages/Playlist";
import NavBar from "../components/NavBar";
import Input from "../components/Input";
import { useCallback, useEffect, useState } from "react";
import { Video } from "../interfaces/Video";
import { api } from "../api/axios";
import toast, { Toaster } from 'react-hot-toast';
import NotFound from "../pages/NotFound";
 function App(){
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [allVideosDatabase, setAllVideosDatabase] = useState<Video[] | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };


  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
       
       getVideos()
      
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
      toast.error('Something were wrong');

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
          // toast('Waiting..', toastConfig);

          const response = await api.post('/videos/findbyPlaylistId', { playlistId: searchValue || search });
         
          if (response.data[0].videoId) {
              navigate(`/watch?playlistId=${searchValue}`);
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
            toast.error('Something were wrong');
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
        <Toaster />

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
      <Route path="/watch" element={<Playlist/>}/>
      <Route path="*" element={<NotFound/>}/>

    </Routes>
  </>
  )
}

export default App;

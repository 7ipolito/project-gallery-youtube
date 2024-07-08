
import { useCallback, useEffect, useState } from 'react';

import { useParams } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import PlayerYoutube from '../../components/PlayerYoutube';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Video } from '../../interfaces/Video';
import ThumbnailItem from '../../components/ThumbnailItem';
import { api } from '../../api/axios';


function Playlist() {
  const location = useLocation();
  const [videos,setVideos]=useState<Video[] | null>(null)
  const [videoSelected,setVideoSelected]=useState<Video | null>(null)

  



const fetchVideosByPlaylistId = useCallback(async()=>{
    try {
      if(location.state==null)  {
        const params = new URLSearchParams(location.search);
        const playlistId = params.get("playlistId");
        const response = await api.post('/videos/findbyPlaylistId', { playlistId: playlistId });
        if (response.data[0].videoId) {
          setVideos(response.data)
          setVideoSelected(response.data[0])
          
        }
      }else{
        console.log(location)
        setVideos(JSON.parse(location.state.videos))
        setVideoSelected(location.state.videoSelected)
      }
    } catch (error) {
      console.log(error)
    }
   
},[location.search, location.state])

useEffect(()=>{
  fetchVideosByPlaylistId()

  console.log(location)

  // console.log(location.state.videoSelected)
  
},[fetchVideosByPlaylistId, location])
  return (
   <div className="min-h-screen flex flex-col m-4 max-w-screen-xl flex-wrap items-center justify-between mx-auto p-4">
        <div className="w-full flex items-center justify-center">
           {videos!=null &&(
              <PlayerYoutube video={videoSelected}>
              {videos?.filter((v:Video) => v.videoId !=  videoSelected?.videoId)!
                .map((v:Video) => (
                  <ThumbnailItem key={v.videoId} onPress={(e) => {setVideoSelected(e)}} video={v!} />
                ))}
            </PlayerYoutube> 
          )}
         
         
        </div>
      </div>
  );
}

export default Playlist;

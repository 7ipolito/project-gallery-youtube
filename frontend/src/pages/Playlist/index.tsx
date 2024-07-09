
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { Video } from '../../interfaces/Video';
import { api } from '../../api/axios';

import Loading from '../../components/Loading';
import { resolvePromise } from '../../utils/resolvePromise';
const PlayerYoutube = lazy(() => resolvePromise(import('../../components/PlayerYoutube')));
const ThumbnailItem = lazy(() => resolvePromise(import('../../components/ThumbnailItem')));

function Playlist() {
  const location = useLocation();
  const [videos,setVideos]=useState<Video[] | null>(null)
  const [videoSelected,setVideoSelected]=useState<Video | null>(null)

  const playerYoutube = useMemo(
    () => (

        <PlayerYoutube video={videoSelected}>
          {videos?.filter((v: Video) => v.videoId !== videoSelected?.videoId)
            .map((v: Video) => (
           
                <ThumbnailItem key={v.videoId} onPress={(e) => setVideoSelected(e)} video={v} />
            ))}
        </PlayerYoutube>
    ),
    [videoSelected, videos]
  );



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
   
},[])

useEffect(()=>{

  fetchVideosByPlaylistId()

  console.log(location)

  // console.log(location.state.videoSelected)
  
},[])
  return (
    <Suspense fallback={<Loading/>}>
   <div className="min-h-screen flex flex-col m-4 max-w-screen-xl flex-wrap items-center justify-between mx-auto p-4">
        <div className="w-full flex items-center justify-center">
             {playerYoutube}
        </div>
      </div>
      </Suspense>
  );
}

export default Playlist;

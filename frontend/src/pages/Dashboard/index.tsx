import { useCallback, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../api/axios';
import Input from '../../components/Input';
import NavBar from '../../components/NavBar';
import PlayerYoutube from '../../components/PlayerYoutube';
import ThumbnailItem from '../../components/ThumbnailItem';
import YoutubeItem from '../../components/YoutubeItem';
import { Video } from '../../interfaces/Video';
import { useNavigate } from 'react-router';

interface DashboardProps{
  videos:Video[] | null
}

function Dashboard({videos}: DashboardProps) {
  const navigate = useNavigate();


  const handleGetInfoVideo = useCallback(
    async (video: Video, playlistId:string) => {
      console.log(video);
        try {
          const response = await api.post('/videos/findbyPlaylistId', { playlistId: playlistId });

          if (response.data[0].videoId) {
            const data ={
              videoSelected:video,
              videos:JSON.stringify(response.data)
            }
            console.log(response.data)
              navigate(`/watch?playlistId=${playlistId}`,  { state:data });
            
          } else {
            throw new Error();
          }
        } catch (error) {
          console.log(error)
        }
      }, 
  
    [navigate],
  );
 

  return (
    <div>
      <ToastContainer />

     
      <div className="min-h-screen flex flex-col m-4 max-w-screen-xl flex-wrap items-center justify-between mx-auto p-4">
        <div className="w-full flex items-center justify-center">
          
            {videos && (
              <div className="w-full flex flex-col ">
                <p className="text-4xl font-bold pb-4">Videos added in database</p>
                {videos?.map((video: Video) => (
                  <YoutubeItem
                    key={video.videoId}
                    onPress={(e) => {
                      handleGetInfoVideo
                      handleGetInfoVideo(e, e.playlistId);
                    }}
                    video={video}
                  />
                ))}
              </div>
            )}
        
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

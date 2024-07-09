import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { api } from '../../api/axios';
import YoutubeItem from '../../components/YoutubeItem';
import { Video } from '../../interfaces/Video';
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { toastConfig } from '../../utils/toastConfig';
import NotFound from '../NotFound';
import { resolvePromise } from '../../utils/resolvePromise';
import Loading from '../../components/Loading';

const YoutubeItemList = lazy(()=> resolvePromise(import("../../components/YoutubeItemList")))
interface DashboardProps{
  videos:Video[] | null
  isLoading:boolean
}

function Dashboard({videos}: DashboardProps) {
  const navigate = useNavigate();


  const handleGetInfoVideo = useCallback(
    async (video: Video, playlistId:string) => {
      console.log(video);
        try {
          toast('Waiting..',toastConfig);
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
    <div className='flex flex-1 w-full h-[100vh]'>
    
{/* <Toaster/> */}
     
<Suspense fallback={<Loading/>}>
      <div className="min-h-screen flex flex-col m-4 max-w-screen-xl flex-wrap items-center justify-between mx-auto p-4">
        <div className="w-full flex items-center justify-center">
              <div className="w-full flex flex-col h-full">
              

                  <YoutubeItemList items={videos}  onPress={(e) => {
                        handleGetInfoVideo
                        handleGetInfoVideo(e, e.playlistId);
                      }}/>
             
              </div>

        </div>
      </div>
      </Suspense>
    </div>
    
  );
}

export default Dashboard;

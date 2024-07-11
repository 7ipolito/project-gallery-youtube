import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { api } from '../../api/axios';
import YoutubeItem from '../../components/YoutubeItem';
import { Video } from '../../interfaces/Video';
import { useNavigate } from 'react-router';
import Loading from '../../components/Loading';
import { resolvePromise } from '@/utils/utils';
import Input from '@/components/Input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const YoutubeItemList = lazy(()=> resolvePromise(import("../../components/YoutubeItemList")))
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
    <div className='flex flex-1 w-full h-[100vh]'>
    
{/* <Toaster/> */}
     
<Suspense fallback={<Loading/>}>

      <div className="min-h-screen flex flex-col m-4 max-w-screen-xl flex-wrap items-center justify-between mx-auto p-4">
        <div className="w-full flex items-center justify-center">
              <div className="grid-cols-4 gap-4 lg:grid">
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

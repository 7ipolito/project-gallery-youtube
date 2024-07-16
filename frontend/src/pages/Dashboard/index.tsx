import { useCallback, useEffect } from 'react';
import { api } from '../../api/axios';
import { Video } from '../../interfaces/Video';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getInitialVideos } from '@/store/actions/videos';
import { setVideoSelected, setVideosRelated } from '@/store/reducers/videos';
import Loading from '@/components/Loading';
import YoutubeItemList from '@/components/YoutubeItemList';
import { AppDispatch } from '@/store';

function Dashboard() {
  const navigate = useNavigate();
  const videos = useSelector((state: any) => state.videos.videoState);
  const isLoading = useSelector((state: any) => state.videos.isLoadingState);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialVideos());
  }, []);

  const handleGetInfoVideo = useCallback(
    async (video: Video, playlistId: string) => {
      try {
        const response = await api.post('/videos/findbyPlaylistId', { playlistId: playlistId });

        if (response.data[0].videoId) {
          dispatch(setVideoSelected(video));
          dispatch(setVideosRelated(response.data));
          navigate(`/watch?playlistId=${playlistId}`);
        } else {
          throw new Error();
        }
      } catch (error) {
        console.log(error);
      }
    },

    [navigate],
  );

  return (
    <div className="flex flex-1 w-full h-[100vh]">
      {!isLoading ? (
        <div className="min-h-screen flex flex-col m-4 max-w-screen-xl flex-wrap items-center justify-between mx-auto p-4">
          <div className="w-full flex items-center justify-center">
            <div className="grid-cols-4 gap-4 lg:grid">
              <YoutubeItemList
                items={videos}
                onPress={(e) => {
                  handleGetInfoVideo(e, e.playlistId);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Dashboard;

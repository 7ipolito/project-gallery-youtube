import { lazy, Suspense, useCallback, useEffect } from 'react';
import { api } from '../../api/axios';
import { Video } from '../../interfaces/Video';
import { useNavigate } from 'react-router';
import { resolvePromise } from '@/utils/utils';
import { useDispatch, useSelector } from 'react-redux';

import { getInitialVideos } from '@/store/actions/videos';
import { setVideoSelected } from '@/store/reducers/videoSelected';
import { setVideosRelated } from '@/store/reducers/videos';
import Loading from '@/components/Loading';

function Dashboard() {
  const navigate = useNavigate();
  const videos = useSelector((state) => state.videos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialVideos());
  }, []);

  const YoutubeItemList = lazy(() =>
    resolvePromise(
      resolvePromise(getInitialVideos()).then(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(import('../../components/YoutubeItemList/index'));
            }, 1000); // Aguarda 1 segundo (1000 milissegundos)
          }),
      ),
    ),
  );

  const handleGetInfoVideo = useCallback(
    async (video: Video, playlistId: string) => {
      console.log(video);
      try {
        const response = await api.post('/videos/findbyPlaylistId', { playlistId: playlistId });

        if (response.data[0].videoId) {
          dispatch(setVideoSelected(video));
          console.log(video);
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
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </div>
  );
}

export default Dashboard;

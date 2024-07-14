import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { Video } from '../../interfaces/Video';
import { api } from '../../api/axios';
import { useDispatch, useSelector } from 'react-redux';

import { resolvePromise } from '@/utils/utils';
import { getVideosByURLPlaylistId } from '@/store/actions/videos';
import { setVideoSelected } from '@/store/reducers/videoSelected';
import Loading from '@/components/Loading';

function Playlist() {
  const location = useLocation();
  const videos = useSelector((state) => state.videos);
  const videoSelected = useSelector((state) => state.videoSelected);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      location: location,
    };
    dispatch(getVideosByURLPlaylistId(data));

    console.log(location);

    // console.log(location.state.videoSelected)
  }, []);

  const PlayerYoutube = lazy(() =>
    resolvePromise(getVideosByURLPlaylistId()).then(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(import('../../components/PlayerYoutube'));
          }, 500); // Aguarda 1 segundo (1000 milissegundos)
        }),
    ),
  );

  const YoutubeItem = lazy(() =>
    resolvePromise(getVideosByURLPlaylistId()).then(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(import('../../components/YoutubeItem'));
          }, 500); // Aguarda 1 segundo (1000 milissegundos)
        }),
    ),
  );

  return (
    <div className="flex flex-1 w-full h-[100vh]">
      <Suspense fallback={<Loading />}>
        <div className="min-h-screen flex flex-col m-4 max-w-screen-xl flex-wrap items-center justify-between mx-auto p-4">
          <div className="w-full flex items-center justify-center">
            <PlayerYoutube video={videoSelected}>
              {videos
                ?.filter((v: Video) => v.videoId !== videoSelected?.videoId)
                .map((v: Video) => (
                  <YoutubeItem
                    key={v.videoId}
                    onPress={(e) => dispatch(setVideoSelected(e))}
                    video={v}
                    isRelatedVideo
                  />
                ))}
            </PlayerYoutube>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default Playlist;

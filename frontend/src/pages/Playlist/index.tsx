import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { Video } from '../../interfaces/Video';
import { useDispatch, useSelector } from 'react-redux';

import { getVideosByURLPlaylistId } from '@/store/actions/videos';
import Loading from '@/components/Loading';
import PlayerYoutube from '@/components/PlayerYoutube';
import YoutubeItem from '@/components/YoutubeItem';
import { setVideoSelected } from '@/store/reducers/videos';
import { AppDispatch } from '@/store';

function Playlist() {
  const location = useLocation();
  const videoSelected = useSelector((state: any) => state.videos.videoSelectedState);
  const videosRelated = useSelector((state: any) => state.videos.videoRelatedState);
  const isLoading = useSelector((state: any) => state.videos.isLoadingState);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const data = {
      location: location,
    };

    dispatch(getVideosByURLPlaylistId(data));
  }, []);

  return (
    <div className="bg-white dark:bg-slate-800 flex flex-1 w-full">
      <div className="min-h-screen flex flex-col m-4 max-w-screen-xl flex-wrap items-center justify-between mx-auto p-4">
        {!isLoading ? (
          <div className="w-full flex items-center justify-center">
            <PlayerYoutube video={videoSelected}>
              {videosRelated
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
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default Playlist;

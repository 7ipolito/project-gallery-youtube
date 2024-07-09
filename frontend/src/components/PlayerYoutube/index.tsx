import { ReactNode } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { Video } from '../../interfaces/Video';
import { isMobile } from '../../utils/isMobile';

interface PlayerYoutubeProps {
  video: Video | null;
  children: ReactNode;
}

function PlayerYoutube({ video, children }: PlayerYoutubeProps) {
  const opts: YouTubeProps['opts'] = {
    height: '480',
    width: isMobile() ? window.innerWidth : 1250,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="items-center justify-center ">
      <YouTube videoId={video?.videoId} opts={opts} />
      <div className="w-full justify-between p-2 max-w-[1250px] rounded-2xl">
        <p className="text-2xl font-bold">{video?.title}</p>

        <p>Description</p>
        <p>{video?.description}</p>
      </div>

      <h2 className="text-2xl font-bold mb-2">Related Videos</h2>

      <div className="grid grid-cols-3 gap-4">
        {children}
        {/* <ThumbnailItem/> */}
      </div>
    </div>
  );
}

export default PlayerYoutube;

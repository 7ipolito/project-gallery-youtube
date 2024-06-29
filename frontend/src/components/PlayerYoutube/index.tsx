import React, { ReactNode } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import YoutubeItem from '../YoutubeItem';
import { Video } from '../../interfaces/Video';

interface PlayerYoutubeProps extends Video {
  children: ReactNode;
}

function PlayerYoutube({ description, videoId, title, children }: PlayerYoutubeProps) {
  const opts: YouTubeProps['opts'] = {
    height: '480',
    width: window.innerWidth < 720 ? window.innerWidth : 1250,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="items-center justify-center">
      <YouTube videoId={videoId} opts={opts} />
      <div className="w-full justify-between p-2 max-w-[1250px]">
        <p className="text-2xl font-bold">{title}</p>

        <p>Description</p>
        <p>{description}</p>
      </div>

      <h2 className="text-2xl font-bold mb-2">Related Videos</h2>

      <div className="grid grid-cols-3 gap-4">
        {children}
        {/* <YoutubeItem/> */}
      </div>
    </div>
  );
}

export default PlayerYoutube;

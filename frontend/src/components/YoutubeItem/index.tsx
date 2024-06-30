import React from 'react';
import { Video } from '../../interfaces/Video';

interface YoutubeItemProps {
  video: Video;
  // eslint-disable-next-line no-unused-vars
  onPress: (videoSelected: Video) => any;
}

const YoutubeItem = ({ onPress, video }: YoutubeItemProps) => {
  return (
    <button className="" onClick={() => onPress(video)}>
      {video.thumbnails.high ? (
        <img src={video.thumbnails.high.url} width={410} alt="Video related" />
      ) : (
        <p>{video.title}</p>
      )}
    </button>
  );
};

export default YoutubeItem;

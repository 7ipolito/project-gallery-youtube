import React from 'react';
import { Video } from '../../interfaces/Video';

interface ThumbnailItemProps {
  video: Video;
  // eslint-disable-next-line no-unused-vars
  onPress: (videoSelected: Video) => any;
}

const ThumbnailItem = ({ onPress, video }: ThumbnailItemProps) => {
  return (
    <button className="" onClick={() => onPress(video)}>
      {video.thumbnails.high && <img src={video.thumbnails.high.url} width={410} alt="Video related" />}
    </button>
  );
};

export default ThumbnailItem;

import React from 'react';
import { Video } from '../../interfaces/Video';

interface ThumbnailItemProps {
  video: Video;
  // eslint-disable-next-line no-unused-vars
  onPress: (videoSelected: Video) => any;
}

const ThumbnailItem = ({ onPress, video }: ThumbnailItemProps) => {
  return (
    <button  onClick={() => onPress(video)}>
      {video.thumbnails.maxres && <img className="rounded-2xl" src={video.thumbnails.maxres.url} width={410} alt="Video related" />}
    </button>
  );
};

export default ThumbnailItem;

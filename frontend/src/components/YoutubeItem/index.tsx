import React from 'react';
import { Video } from '../../interfaces/Video';
import { format } from 'date-fns';
import { IoEyeSharp } from 'react-icons/io5';

interface YoutubeItemProps {
  video: Video;
  // eslint-disable-next-line no-unused-vars
  onPress: (videoSelected: Video) => any;
}

const YoutubeItem = ({ onPress, video }: YoutubeItemProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <button className="w-full hover:bg-slate-100   rounded-md mb-4" onClick={() => onPress(video)}>
      {video.thumbnails.high && (
        <div className=" flex ">
          <div className="flex flex-row items-center">
            <img src={video.thumbnails.high.url} width={410} alt="Video related" className="pr-4 pb-4" />
            <div className="flex flex-col">
              <p className="text-xl block">{video.title}</p>
              <p className="text-xl block">Published At: {format(video.publishedAt, 'MM/dd/yyyy')}</p>
            </div>
          </div>
        </div>
      )}
    </button>
  );
};

export default YoutubeItem;

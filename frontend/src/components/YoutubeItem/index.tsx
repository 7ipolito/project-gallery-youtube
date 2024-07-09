import React, { useEffect, useState } from 'react';
import { Video } from '../../interfaces/Video';
import { format } from 'date-fns';
import { IoEyeSharp } from 'react-icons/io5';
import { isMobile } from '../../utils/isMobile';

interface YoutubeItemProps {
  video: Video;
  // eslint-disable-next-line no-unused-vars
  onPress: (videoSelected: Video) => any;
}

const YoutubeItem = ({ onPress, video }: YoutubeItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const preloadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          setImageLoaded(true);
          resolve();
        };
        img.onerror = reject;
      });
    };

    if (video.thumbnails.maxres) {
      preloadImage(video.thumbnails.maxres.url);
    }
  }, [video.thumbnails.maxres]);

  return (
    <button className="w-full hover:bg-slate-100 rounded-2xl mb-1" onClick={() => onPress(video)}>
      
        <div className="flex flex-row items-center">
          {!imageLoaded ? (
            <div
              style={{ width: isMobile() ? 140 : 480, height: isMobile() ? 67 : 270 }}
              className="bg-gray-200 animate-pulse rounded-xl mr-2 w-10"
            />
          ) : (
            <img
              src={video.thumbnails.maxres.url}
              loading="eager"
              width={isMobile() ? 140 : 480}
              alt="Video related"
              className=" transition-opacity duration-500 ease-in-out opacity-0 rounded-xl mr-2"
              onLoad={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            />
          )}
          <div className="flex flex-col">
            <p className="text-xl block">{video.title}</p>
            <p className="text-xl block">
              Published At: {format(video.publishedAt, 'MM/dd/yyyy')}
            </p>
          </div>
      </div>
    </button>
  );
};

export default YoutubeItem;
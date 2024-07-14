import { memo, useEffect, useState } from 'react';
import { Video } from '../../interfaces/Video';
import { format } from 'date-fns';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import LinesEllipsis from 'react-lines-ellipsis';

interface YoutubeItemProps {
  video: Video;
  isRelatedVideo?: boolean;
  // eslint-disable-next-line no-unused-vars
  onPress: (videoSelected: Video) => any;
}

const YoutubeItem = ({ onPress, video, isRelatedVideo = false }: YoutubeItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const preloadImage = (url: string) => {
      return new Promise<void>((resolve, reject) => {
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
    <div className="flex flex-row items-center">
      {!imageLoaded ? (
        <>
          <Skeleton className={`w-full ${isRelatedVideo ? 'h-96' : 'h-80'} rounded-2xl animate-pulse `} />
        </>
      ) : (
        <Card
          className={`w-full cursor-pointer   ${isRelatedVideo ? 'h-96' : 'h-80'} hover:bg-slate-100 rounded-2xl mb-4`}
          onClick={() => onPress(video)}
        >
          <CardHeader className="h-28 ">
            <LinesEllipsis
              text={video.title}
              maxLine="3"
              ellipsis="..."
              trimRight
              basedOn="letters"
              component="h3"
              className="text-2xl font-semibold leading-none tracking-tight"
            />
          </CardHeader>
          <CardContent className="h-50 ">
            <img
              src={video.thumbnails.maxres.url}
              loading="eager"
              width={480}
              alt="Video related"
              className=" transition-opacity duration-500 ease-in-out opacity-0 rounded-xl mr-2"
              onLoad={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            />
          </CardContent>
          <CardFooter className="flex justify-between mb-4">
            <CardDescription>{format(video.publishedAt, 'MM/dd/yyyy')}</CardDescription>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default memo(YoutubeItem);

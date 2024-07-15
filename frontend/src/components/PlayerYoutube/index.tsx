import { ReactNode, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { Video } from '../../interfaces/Video';
import { isMobile } from '@/utils/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '../ui/label';
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

  useEffect(() => {
    console.log(video?.payload?.videoId);
  }, [video]);

  return (
    <div className="items-center justify-center ">
      <YouTube videoId={video?.videoId} opts={opts} />
      <div className="justify-between py-2 lg:max-w-[1250px] rounded-2xl">
        <Label className="text-2xl font-bold">{video?.title}</Label>
        <Accordion type="single" collapsible className=" bg-slate-50 rounded-lg p-2">
          <AccordionItem value="item-1">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>{video?.description}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Label className="text-2xl font-bold">Related Videos</Label>

      <div className="lg:grid lg:grid-cols-3 lg:gap-4 p-4">{children}</div>
    </div>
  );
}

export default PlayerYoutube;

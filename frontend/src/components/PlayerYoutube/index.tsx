
import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import YoutubeItem from '../YoutubeItem';


function PlayerYoutube() {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const opts: YouTubeProps['opts'] = {
    height: '480',
    width: window.innerWidth <720?window.innerWidth:1250,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className='items-center justify-center'>
    <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={onPlayerReady} />
    <div className='w-full justify-between p-2 max-w-[1250px]'>
      <p className='text-2xl font-bold'>Como aprender prisma...</p>
      <p>0 Views</p>
      
      <p>Description</p>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>

    <h2 className='text-2xl font-bold mb-2'>Related Videos</h2>

    <div className="grid grid-cols-3 gap-4">
      <YoutubeItem thumbnail='https://i.ytimg.com/vi/hmUyEDG7Jy0/hqdefault.jpg'/>
      <YoutubeItem thumbnail='https://i.ytimg.com/vi/q0hyYWKXF0Q/hqdefault.jpg'/>
      <YoutubeItem thumbnail='https://i.ytimg.com/vi/XXYlFuWEuKI/hqdefault.jpg'/>
      <YoutubeItem thumbnail='https://i.ytimg.com/vi/gNi_6U5Pm_o/hqdefault.jpg'/>
      <YoutubeItem thumbnail='https://i.ytimg.com/vi/adLGHcj_fmA/hqdefault.jpg'/>
      {/* <YoutubeItem/> */}


      
    </div>
  </div>
)
}

export default PlayerYoutube;

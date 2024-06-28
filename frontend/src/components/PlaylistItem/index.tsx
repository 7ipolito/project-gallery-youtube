import React from 'react';



const PlaylistItem: React.FC = () => {
  return (
    <button className='w-[1250px] rounded-lg h-[200px] bg-red-900 flex items-center justify-center hover:bg-red-950'>
      <p className='text-white text-2xl'>Mix - Playlist</p>
  </button>
  
  )
}

export default PlaylistItem;
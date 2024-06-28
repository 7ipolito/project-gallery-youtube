import React from 'react';



const PlaylistItem: React.FC = () => {
  return (
    <div className='w-full rounded-lg h-[200px] bg-red-900 flex items-center justify-center'>
    <div className='flex justify-between w-full text-center p-20'>
      <p className='text-white text-2xl'>Mix - Playlist</p>
      <p className='text-white text-2xl'>Published At: 23/06/2003</p>
    </div>
  </div>
  
  )
}

export default PlaylistItem;
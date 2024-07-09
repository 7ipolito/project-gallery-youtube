import { Video } from "../../interfaces/Video";
import YoutubeItem from "../YoutubeItem";

interface YoutubeItemListProps{
    items:Video[] | null
    onPress: (videoSelected: Video) => any;
  }

const YoutubeItemList = ({items, onPress}:YoutubeItemListProps)=>{
  if (!items) {
    return <div>Loading...</div>; // ou qualquer outro placeholder
  }
  return(
  <>
    {items?.map((item:Video)=>(
      <YoutubeItem key={item.videoId} video={item} onPress={onPress}/>
    ))}
  </>
  )

}

export default YoutubeItemList;

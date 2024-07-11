import { memo } from 'react';
import { Video } from '../../interfaces/Video';
import YoutubeItem from '../YoutubeItem';

interface YoutubeItemListProps {
  items: Video[] | null;
  onPress: (videoSelected: Video) => any;
}

const YoutubeItemList = ({ items, onPress }: YoutubeItemListProps) => {
  return <>{items?.map((item: Video) => <YoutubeItem key={item.videoId} video={item} onPress={onPress} />)}</>;
};

export default memo(YoutubeItemList);

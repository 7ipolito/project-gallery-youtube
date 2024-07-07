
import { useParams } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';


function Playlist() {
  const {playlistId} = useParams()

  return (
   <h1>Playlist {playlistId}</h1>
  );
}

export default Playlist;

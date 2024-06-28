import Input from "../components/Input";
import NavBar from "../components/NavBar";
import PlayerYoutube from "../components/PlayerYoutube";
import PlaylistItem from "../components/PlaylistItem";

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col m-4">
      <NavBar />
      <div className="flex items-center justify-center">
  {/* <PlaylistItem /> */}
  </div>
  <div className="w-full flex items-center justify-center">
    <PlayerYoutube />
  </div>

  
  {/* <div className="flex-1 flex items-center justify-center">
    <p className="text-2xl">Welcome to gallery youtube, search something</p>
  </div> */}
  
</div>

  )
}

export default Dashboard;

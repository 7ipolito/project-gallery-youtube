import Input from "../components/Input";
import NavBar from "../components/NavBar";
import PlayerYoutube from "../components/PlayerYoutube";
import PlaylistItem from "../components/PlaylistItem";

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col m-4">
     <NavBar/>
     <Input label={"PlaylistId"} placeholder={"Search by playlistId"}/>




       <PlaylistItem/>
    </div>
  )
}

export default Dashboard;

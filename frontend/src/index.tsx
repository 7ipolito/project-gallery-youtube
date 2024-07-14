/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Playlist from './pages/Playlist';
import NavBar from './components/NavBar';
import { Toaster } from 'react-hot-toast';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/watch" element={<Playlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

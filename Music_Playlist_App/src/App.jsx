import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MusicProvider } from './context/MusicContext';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import PlayerBar from './components/PlayerBar';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';

function App() {
  return (
    <MusicProvider>
      <Router>
        <div className="flex h-screen bg-spotify-black text-white overflow-hidden">
          <Sidebar />
          <main className="flex-1 md:ml-64 overflow-y-auto pb-36 md:pb-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" element={<Library />} />
              <Route path="/playlist/:id" element={<Playlist />} />
            </Routes>
          </main>
          <MobileNav />
          <PlayerBar />
        </div>
      </Router>
    </MusicProvider>
  );
}

export default App;


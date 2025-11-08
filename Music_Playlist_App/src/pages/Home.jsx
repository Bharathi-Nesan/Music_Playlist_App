import { useMusic } from '../context/MusicContext';
import SongCard from '../components/SongCard';
import { motion } from 'framer-motion';

const Home = () => {
  const { songs } = useMusic();

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Good evening</h1>
        <p className="text-spotify-lightgray text-sm md:text-base">Discover new music and enjoy your favorites</p>
      </div>

      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Recently Played</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {songs.slice(0, 6).map((song) => (
            <SongCard key={song.id} song={song} showPlaylistOptions={true} />
          ))}
        </div>
      </div>

      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Made for You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {songs.slice(6).map((song) => (
            <SongCard key={song.id} song={song} showPlaylistOptions={true} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">All Songs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} showPlaylistOptions={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;


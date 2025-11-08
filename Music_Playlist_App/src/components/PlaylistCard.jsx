import { Link } from 'react-router-dom';
import { useMusic } from '../context/MusicContext';
import { motion } from 'framer-motion';
import { useState } from 'react';

const PlaylistCard = ({ playlist, isLikedSongs = false }) => {
  const { songs, deletePlaylist, setQueueFromSongs, likedSongs } = useMusic();
  const [showDelete, setShowDelete] = useState(false);

  const playlistSongs = isLikedSongs
    ? songs.filter(song => likedSongs.includes(song.id))
    : songs.filter(song => playlist.songs.includes(song.id));

  const handlePlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const songIds = playlistSongs.map(song => song.id);
    setQueueFromSongs(songIds);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${playlist.name}"?`)) {
      deletePlaylist(playlist.id);
    }
  };

  if (isLikedSongs) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="group relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg"
      >
        <Link to="/playlist/liked" className="block">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg">Liked Songs</h3>
              <p className="text-white text-opacity-80 text-sm">{playlistSongs.length} songs</p>
            </div>
            <button
              onClick={handlePlay}
              className="bg-spotify-green text-black rounded-full p-4 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="group relative bg-spotify-dark rounded-lg p-4 cursor-pointer transition-all hover:bg-spotify-gray"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <Link to={`/playlist/${playlist.id}`} className="block">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium truncate">{playlist.name}</h3>
            <p className="text-spotify-lightgray text-sm">{playlistSongs.length} songs</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlay}
              className="bg-spotify-green text-black rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
            {showDelete && (
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-400 p-2 transition-colors"
                title="Delete Playlist"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PlaylistCard;


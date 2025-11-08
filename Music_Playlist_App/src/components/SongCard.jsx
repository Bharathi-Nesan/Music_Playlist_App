import { useMusic } from '../context/MusicContext';
import { motion } from 'framer-motion';
import { useState } from 'react';

const SongCard = ({ song, showPlaylistOptions = false }) => {
  const {
    currentSong,
    isPlaying,
    playSong,
    likedSongs,
    toggleLikeSong,
    playlists,
    addSongToPlaylist,
    removeSongFromPlaylist
  } = useMusic();

  const [showMenu, setShowMenu] = useState(false);
  const isLiked = likedSongs.includes(song.id);
  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = () => {
    playSong(song);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    toggleLikeSong(song.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`group relative bg-spotify-dark rounded-lg p-4 cursor-pointer transition-all ${
        isCurrentSong ? 'bg-spotify-gray ring-2 ring-spotify-green' : 'hover:bg-spotify-gray'
      }`}
      onClick={handlePlay}
    >
      <div className="relative">
        <img
          src={song.image}
          alt={song.title}
          className="w-full aspect-square object-cover rounded-lg mb-3"
        />
        {isCurrentSong && isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <div className="flex gap-1">
              <div className="w-1 h-8 bg-spotify-green rounded animate-pulse" style={{ animationDelay: '0s' }}></div>
              <div className="w-1 h-8 bg-spotify-green rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-8 bg-spotify-green rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePlay();
          }}
          className="absolute bottom-2 right-2 bg-spotify-green text-black rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium truncate">{song.title}</h3>
          <p className="text-spotify-lightgray text-sm truncate">{song.artist}</p>
        </div>
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={handleLike}
            className={`p-1 ${isLiked ? 'text-spotify-green' : 'text-spotify-lightgray'} hover:text-white transition-colors`}
            title={isLiked ? 'Remove from Liked' : 'Add to Liked'}
          >
            <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          {showPlaylistOptions && (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="p-1 text-spotify-lightgray hover:text-white transition-colors"
                title="Add to Playlist"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-spotify-gray rounded-lg shadow-lg z-10 py-1">
                  {playlists.map(playlist => {
                    const isInPlaylist = playlist.songs.includes(song.id);
                    return (
                      <button
                        key={playlist.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isInPlaylist) {
                            removeSongFromPlaylist(playlist.id, song.id);
                          } else {
                            addSongToPlaylist(playlist.id, song.id);
                          }
                          setShowMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-spotify-dark transition-colors"
                      >
                        {isInPlaylist ? '✓ ' : ''}{playlist.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SongCard;


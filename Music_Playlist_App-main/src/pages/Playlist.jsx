import { useParams, useNavigate } from 'react-router-dom';
import { useMusic } from '../context/MusicContext';
import SongCard from '../components/SongCard';
import { formatTime } from '../data/songsData';

const Playlist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { songs, playlists, setQueueFromSongs, likedSongs } = useMusic();

  const isLikedSongs = id === 'liked';
  
  const playlist = isLikedSongs
    ? { id: 'liked', name: 'Liked Songs', songs: likedSongs }
    : playlists.find(p => p.id === parseInt(id));

  if (!playlist) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <p className="text-spotify-lightgray text-lg">Playlist not found</p>
          <button
            onClick={() => navigate('/library')}
            className="mt-4 text-spotify-green hover:underline"
          >
            Go back to Library
          </button>
        </div>
      </div>
    );
  }

  const playlistSongs = songs.filter(song => 
    isLikedSongs ? likedSongs.includes(song.id) : playlist.songs.includes(song.id)
  );

  const totalDuration = playlistSongs.reduce((acc, song) => acc + song.duration, 0);

  const handlePlayAll = () => {
    const songIds = playlistSongs.map(song => song.id);
    setQueueFromSongs(songIds);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 mb-4 md:mb-6">
          <div className={`w-32 h-32 sm:w-48 sm:h-48 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isLikedSongs 
              ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
              : 'bg-gradient-to-br from-blue-500 to-purple-500'
          }`}>
            {isLikedSongs ? (
              <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-spotify-lightgray mb-2 text-center sm:text-left">
              {isLikedSongs ? 'Playlist' : 'PLAYLIST'}
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-2 md:mb-4 text-center sm:text-left">{playlist.name}</h1>
            <div className="flex items-center gap-2 text-spotify-lightgray text-sm text-center sm:text-left">
              <span>{playlistSongs.length} songs</span>
              <span>•</span>
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center sm:justify-start gap-4 mb-6 md:mb-8">
          <button
            onClick={handlePlayAll}
            className="bg-spotify-green text-black rounded-full px-8 py-3 font-bold hover:scale-105 transition-transform"
          >
            Play
          </button>
        </div>
      </div>

      {playlistSongs.length > 0 ? (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {playlistSongs.map((song) => (
              <SongCard key={song.id} song={song} showPlaylistOptions={true} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-spotify-lightgray text-lg">This playlist is empty</p>
          <p className="text-spotify-lightgray text-sm mt-2">
            {isLikedSongs 
              ? 'Like some songs to see them here' 
              : 'Add songs to this playlist to get started'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Playlist;


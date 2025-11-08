import { useState } from 'react';
import { useMusic } from '../context/MusicContext';
import PlaylistCard from '../components/PlaylistCard';

const Library = () => {
  const { playlists, createPlaylist, likedSongs } = useMusic();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [playlistName, setPlaylistName] = useState('');

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    if (playlistName.trim()) {
      createPlaylist(playlistName.trim());
      setPlaylistName('');
      setShowCreateForm(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-4xl font-bold text-white">Your Library</h1>
        <div className="flex items-center gap-4">
          {!showCreateForm ? (
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-white text-black px-6 py-2 rounded-full font-medium hover:scale-105 transition-transform"
            >
              Create Playlist
            </button>
          ) : (
            <form onSubmit={handleCreatePlaylist} className="flex items-center gap-2">
              <input
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Playlist name"
                className="bg-spotify-gray text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-spotify-green"
                autoFocus
              />
              <button
                type="submit"
                className="bg-spotify-green text-black px-4 py-2 rounded-lg font-medium hover:bg-green-400 transition-colors"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setPlaylistName('');
                }}
                className="bg-spotify-gray text-white px-4 py-2 rounded-lg font-medium hover:bg-spotify-dark transition-colors"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {likedSongs.length > 0 && (
          <PlaylistCard isLikedSongs={true} />
        )}
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>

      {playlists.length === 0 && likedSongs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-spotify-lightgray text-lg mb-4">Your library is empty</p>
          <p className="text-spotify-lightgray text-sm">Create a playlist or like some songs to get started</p>
        </div>
      )}
    </div>
  );
};

export default Library;


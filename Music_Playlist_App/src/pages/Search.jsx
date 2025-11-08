import { useState, useMemo } from 'react';
import { useMusic } from '../context/MusicContext';
import SongCard from '../components/SongCard';
import SearchBar from '../components/SearchBar';

const Search = () => {
  const { songs } = useMusic();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) {
      return songs;
    }
    const query = searchQuery.toLowerCase();
    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query)
    );
  }, [searchQuery, songs]);

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">Search</h1>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {searchQuery && (
        <div className="mb-4">
          <p className="text-spotify-lightgray">
            Found {filteredSongs.length} {filteredSongs.length === 1 ? 'result' : 'results'} for "{searchQuery}"
          </p>
        </div>
      )}

      {filteredSongs.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {filteredSongs.map((song) => (
            <SongCard key={song.id} song={song} showPlaylistOptions={true} />
          ))}
        </div>
      ) : searchQuery ? (
        <div className="text-center py-12">
          <p className="text-spotify-lightgray text-lg">No songs found</p>
          <p className="text-spotify-lightgray text-sm mt-2">Try a different search term</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-spotify-lightgray text-lg">Start searching for your favorite songs</p>
        </div>
      )}
    </div>
  );
};

export default Search;


import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { songsData, formatTime } from '../data/songsData';

const MusicContext = createContext();

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

export const MusicProvider = ({ children }) => {
  const [songs] = useState(songsData);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlists, setPlaylists] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const audioRef = useRef(null);

  // Initialize queue when songs change
  useEffect(() => {
    if (songs.length > 0 && queue.length === 0) {
      setQueue(songs.map(song => song.id));
    }
  }, [songs]);

  const playSong = useCallback((song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setCurrentTime(0);
    // Update currentIndex if song is in queue
    const songIndex = queue.indexOf(song.id);
    if (songIndex !== -1) {
      setCurrentIndex(songIndex);
    }
    if (audioRef.current) {
      audioRef.current.src = song.audioUrl;
      audioRef.current.load();
    }
  }, [queue]);

  const handleNext = useCallback(() => {
    if (queue.length === 0) return;
    
    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = (currentIndex + 1) % queue.length;
    }
    
    if (repeat && nextIndex === 0 && !shuffle && currentIndex === queue.length - 1) {
      nextIndex = currentIndex;
    }
    
    setCurrentIndex(nextIndex);
    const nextSongId = queue[nextIndex];
    const nextSong = songs.find(s => s.id === nextSongId);
    if (nextSong) {
      setCurrentSong(nextSong);
      setIsPlaying(true);
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.src = nextSong.audioUrl;
        audioRef.current.load();
      }
    }
  }, [queue, currentIndex, shuffle, repeat, songs]);

  const handlePrevious = useCallback(() => {
    if (queue.length === 0) return;
    
    let prevIndex;
    if (shuffle) {
      prevIndex = Math.floor(Math.random() * queue.length);
    } else {
      prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    }
    
    setCurrentIndex(prevIndex);
    const prevSongId = queue[prevIndex];
    const prevSong = songs.find(s => s.id === prevSongId);
    if (prevSong) {
      setCurrentSong(prevSong);
      setIsPlaying(true);
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.src = prevSong.audioUrl;
        audioRef.current.load();
      }
    }
  }, [queue, currentIndex, shuffle, songs]);

  // Handle audio time updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => handleNext();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong, handleNext]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Play/Pause functionality
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error('Play error:', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pos * audio.duration;
  };

  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now(),
      name,
      songs: [],
      createdAt: new Date().toISOString()
    };
    setPlaylists([...playlists, newPlaylist]);
    return newPlaylist;
  };

  const addSongToPlaylist = (playlistId, songId) => {
    setPlaylists(playlists.map(playlist => 
      playlist.id === playlistId && !playlist.songs.includes(songId)
        ? { ...playlist, songs: [...playlist.songs, songId] }
        : playlist
    ));
  };

  const removeSongFromPlaylist = (playlistId, songId) => {
    setPlaylists(playlists.map(playlist => 
      playlist.id === playlistId
        ? { ...playlist, songs: playlist.songs.filter(id => id !== songId) }
        : playlist
    ));
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists(playlists.filter(playlist => playlist.id !== playlistId));
  };

  const toggleLikeSong = (songId) => {
    setLikedSongs(prev => 
      prev.includes(songId)
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  const setQueueFromSongs = useCallback((songIds) => {
    setQueue(songIds);
    setCurrentIndex(0);
    if (songIds.length > 0) {
      const firstSong = songs.find(s => s.id === songIds[0]);
      if (firstSong) {
        setCurrentSong(firstSong);
        setIsPlaying(true);
        setCurrentTime(0);
        if (audioRef.current) {
          audioRef.current.src = firstSong.audioUrl;
          audioRef.current.load();
        }
      }
    }
  }, [songs]);

  const value = {
    songs,
    currentSong,
    isPlaying,
    volume,
    setVolume,
    currentTime,
    duration,
    playlists,
    likedSongs,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
    playSong,
    togglePlayPause,
    handleNext,
    handlePrevious,
    handleSeek,
    createPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    deletePlaylist,
    toggleLikeSong,
    setQueueFromSongs,
    formatTime,
    audioRef
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="metadata" />
    </MusicContext.Provider>
  );
};


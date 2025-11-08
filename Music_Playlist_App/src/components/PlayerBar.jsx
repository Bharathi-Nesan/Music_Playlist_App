import { useMusic } from '../context/MusicContext';
import { motion } from 'framer-motion';

const PlayerBar = () => {
  const {
    currentSong,
    isPlaying,
    volume,
    setVolume,
    currentTime,
    duration,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
    togglePlayPause,
    handleNext,
    handlePrevious,
    handleSeek,
    formatTime
  } = useMusic();

  if (!currentSong) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-spotify-gray border-t border-spotify-dark flex items-center justify-center">
        <p className="text-spotify-lightgray">Select a song to play</p>
      </div>
    );
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 h-20 md:h-24 bg-spotify-gray border-t border-spotify-dark z-50 md:z-50"
    >
      <div className="flex items-center justify-between h-full px-2 md:px-4">
        {/* Current Song Info */}
        <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0 max-w-[30%]">
          <img
            src={currentSong.image}
            alt={currentSong.title}
            className="w-12 h-12 md:w-16 md:h-16 rounded object-cover flex-shrink-0"
          />
          <div className="min-w-0 flex-1 hidden sm:block">
            <p className="text-white font-medium truncate text-sm md:text-base">{currentSong.title}</p>
            <p className="text-spotify-lightgray text-xs md:text-sm truncate">{currentSong.artist}</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-1 md:gap-2 flex-1 max-w-2xl px-2">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setShuffle(!shuffle)}
              className={`p-1 md:p-2 ${shuffle ? 'text-spotify-green' : 'text-spotify-lightgray'} hover:text-white transition-colors hidden md:block`}
              title="Shuffle"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>

            <button
              onClick={handlePrevious}
              className="p-1 md:p-2 text-spotify-lightgray hover:text-white transition-colors"
              title="Previous"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
              </svg>
            </button>

            <button
              onClick={togglePlayPause}
              className="bg-white text-black rounded-full p-2 md:p-3 hover:scale-105 transition-transform"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            <button
              onClick={handleNext}
              className="p-1 md:p-2 text-spotify-lightgray hover:text-white transition-colors"
              title="Next"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0011 6v2.798l-5.445-3.63z" />
              </svg>
            </button>

            <button
              onClick={() => setRepeat(!repeat)}
              className={`p-1 md:p-2 ${repeat ? 'text-spotify-green' : 'text-spotify-lightgray'} hover:text-white transition-colors hidden md:block`}
              title="Repeat"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-1 md:gap-2 w-full">
            <span className="text-xs text-spotify-lightgray w-8 md:w-10 text-right hidden sm:block">
              {formatTime(currentTime)}
            </span>
            <div
              className="flex-1 h-1 bg-spotify-dark rounded-full cursor-pointer group relative"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-white rounded-full transition-all group-hover:bg-spotify-green"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="hidden group-hover:block w-3 h-3 bg-white rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2"></div>
              </div>
            </div>
            <span className="text-xs text-spotify-lightgray w-8 md:w-10 hidden sm:block">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
          <svg className="w-5 h-5 text-spotify-lightgray" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-3.617a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 h-1 bg-spotify-dark rounded-full appearance-none cursor-pointer accent-white hover:accent-spotify-green"
          />
          <span className="text-xs text-spotify-lightgray w-8">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerBar;


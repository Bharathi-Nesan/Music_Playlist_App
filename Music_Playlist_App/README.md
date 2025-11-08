<<<<<<< HEAD
# Music Playlist - Spotify Inspired

A modern, fully-featured music player web application inspired by Spotify, built with React, React Router, and Tailwind CSS.

## Features

### Core Functionality
- 🎵 **Browse Songs**: Display songs in a beautiful grid/list layout with album covers
- 🎮 **Music Player**: Full-featured player with play, pause, next, previous, volume, and progress controls
- 📊 **Currently Playing**: See the currently playing song with album art and details
- 📝 **Playlist Management**: Create, manage, and delete playlists
- ➕ **Add/Remove Songs**: Add or remove songs from playlists
- 🔍 **Search**: Search songs by title, artist, or album
- ❤️ **Liked Songs**: Mark favorite songs and view them in a dedicated section
- 🔀 **Shuffle & Repeat**: Control playback with shuffle and repeat modes

### UI/UX Features
- 🎨 **Dark Theme**: Beautiful dark interface inspired by Spotify
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎭 **Smooth Animations**: Enhanced user experience with Framer Motion animations
- 🎯 **Intuitive Navigation**: Easy-to-use sidebar navigation
- 🎹 **Sticky Player Bar**: Player bar always visible at the bottom

### Pages
- **Home**: Browse featured songs and recently played
- **Search**: Search and filter songs
- **Library**: View all playlists and liked songs
- **Playlist**: View and play songs in a specific playlist

## Technology Stack

- **React 18** - UI library
- **React Router 6** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Vite** - Build tool

## Project Structure

```
src/
  components/       # Reusable components
    Sidebar.jsx     # Navigation sidebar
    PlayerBar.jsx   # Bottom player bar
    SongCard.jsx    # Song card component
    PlaylistCard.jsx # Playlist card component
    SearchBar.jsx   # Search input component
  pages/            # Page components
    Home.jsx        # Home page
    Search.jsx      # Search page
    Library.jsx     # Library page
    Playlist.jsx    # Playlist page
  context/          # Context API
    MusicContext.jsx # Global music state management
  data/             # Data files
    songsData.js    # Songs data and utilities
  styles/           # Styles
    index.css       # Global styles
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Usage

### Playing Songs
- Click on any song card to start playing
- Use the player bar controls to play, pause, skip, or adjust volume
- Click on the progress bar to seek to a specific position

### Managing Playlists
1. Go to the Library page
2. Click "Create Playlist" button
3. Enter a playlist name and click "Create"
4. Click the menu icon (⋮) on any song card to add it to a playlist
5. View playlists in the Library page
6. Click on a playlist to view and play its songs

### Liking Songs
- Click the heart icon on any song card to like/unlike it
- Liked songs appear in the "Liked Songs" playlist in your Library

### Searching
- Go to the Search page
- Type in the search bar to filter songs by title, artist, or album

## Customization

### Adding Songs
Edit `src/data/songsData.js` to add or modify songs:

```javascript
{
  id: 1,
  title: "Song Title",
  artist: "Artist Name",
  album: "Album Name",
  duration: 200, // in seconds
  image: "image-url",
  audioUrl: "audio-url"
}
```

### Styling
The app uses Tailwind CSS. Customize colors in `tailwind.config.js`:

```javascript
colors: {
  spotify: {
    green: '#1DB954',
    black: '#121212',
    dark: '#181818',
    gray: '#282828',
    lightgray: '#B3B3B3',
  }
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Design inspired by Spotify
- Icons from Heroicons
- Images from Unsplash

=======
# Music_Playlist_App
>>>>>>> 56aaa6bd40b9c93a4d6fc5f92bd44bd1aa980566

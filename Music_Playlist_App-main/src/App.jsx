import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MusicProvider } from './context/MusicContext';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import PlayerBar from './components/PlayerBar';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const ProtectedLayout = ({ children }) => {
  return (
    <MusicProvider>
      <div className="flex h-screen bg-spotify-black text-white overflow-hidden">
        <Sidebar />
        <main className="flex-1 md:ml-64 overflow-y-auto pb-36 md:pb-24">
          {children}
        </main>
        <MobileNav />
        <PlayerBar />
      </div>
    </MusicProvider>
  );
};

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-spotify-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
      />
      <Route 
        path="/signup" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <SignUp />} 
      />
      
      {/* Protected Routes */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <ProtectedLayout>
              <Home />
            </ProtectedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/search"
        element={
          isAuthenticated ? (
            <ProtectedLayout>
              <Search />
            </ProtectedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/library"
        element={
          isAuthenticated ? (
            <ProtectedLayout>
              <Library />
            </ProtectedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/playlist/:id"
        element={
          isAuthenticated ? (
            <ProtectedLayout>
              <Playlist />
            </ProtectedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      
      {/* Catch all - redirect to login if not authenticated, home if authenticated */}
      <Route 
        path="*" 
        element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} 
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;


import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/search', label: 'Search', icon: '🔍' },
    { path: '/library', label: 'Your Library', icon: '📚' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-spotify-black p-6 flex flex-col z-40 hidden md:flex">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Music Player</h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-spotify-gray text-white'
                      : 'text-spotify-lightgray hover:text-white hover:bg-spotify-gray'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-spotify-gray">
        {user && (
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-spotify-green rounded-full flex items-center justify-center text-black font-bold">
                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate text-sm">
                  {user.name || user.email}
                </p>
                <p className="text-spotify-lightgray text-xs truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-spotify-gray hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Log out
            </button>
          </div>
        )}
        <p className="text-xs text-spotify-lightgray">
          © 2024 Music Player
        </p>
      </div>
    </div>
  );
};

export default Sidebar;


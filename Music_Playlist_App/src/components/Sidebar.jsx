import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/search', label: 'Search', icon: '🔍' },
    { path: '/library', label: 'Your Library', icon: '📚' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-spotify-black p-6 flex flex-col z-40 hidden md:flex">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Rhythmix 🎵</h1>
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
        <p className="text-xs text-spotify-lightgray">
          © 2024 Music Player
        </p>
      </div>
    </div>
  );
};

export default Sidebar;


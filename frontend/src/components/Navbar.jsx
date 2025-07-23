import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, Settings, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-white/10 backdrop-blur border-b border-white/20 text-white px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* LEFT: Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <MessageSquare className="text-blue-400" size={24} />
            <h1 className="text-xl font-bold text-white">SocketX</h1>
          </Link>
        </div>

        {/* RIGHT: Menu */}
        <div className="flex items-center gap-5 text-sm">
          <Link
            to="/settings"
            className="hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            <Settings size={18} />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link
                to="/profile"
                className="hover:text-blue-300 transition-colors flex items-center gap-1"
              >
                <User size={18} />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={logout}
                className="hover:text-red-400 transition-colors flex items-center gap-1"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

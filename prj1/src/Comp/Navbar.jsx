import React from 'react'
import { useNavigate } from 'react-router-dom';

const ranks = {
  bronze: { label: "Bronze", color: "bg-orange-500", icon: "🥉" },
  silver: { label: "Silver", color: "bg-gray-400", icon: "🥈" },
  gold: { label: "Gold", color: "bg-yellow-400", icon: "🥇" },
  platinum: { label: "Platinum", color: "bg-cyan-400", icon: "💎" },
};

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => setUser(null);
  const handleMyprofile = () => navigate('/myaccount');
  const handleLogin = () => navigate('/authen/login');
  const handleSignin = () => navigate('/authen/signup');

  const formatCurrency = (num) => {
    if (!num && num !== 0) return "";
    return num.toLocaleString("vi-VN");
  };


  const checkUserRank = () => {
    if (!user) return null;
    const { ranking } = user;
    return (
      <div className="flex items-center gap-3">
        {/* Badge Rank */}
        <div className={`px-2 py-1 rounded-lg text-white text-sm font-semibold shadow-sm ${ranks[ranking].color}`}>
          {ranks[ranking].icon} {ranks[ranking].label}
        </div>
        {/* Avatar */}
        <img
          onClick={handleMyprofile}
          src={user.avatar || "https://via.placeholder.com/40"}
          alt="avatar"
          className="w-9 h-9 rounded-full object-cover border-2 border-white shadow cursor-pointer hover:scale-105 transition"
        />
      </div>
    );
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 shadow-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
      {/* Left side (logo / brand name) */}
      <div className="text-lg font-bold tracking-wide cursor-pointer">
        MyWebsite
      </div>

      {/* Center (search bar) */}
      <div className="flex-1 px-6">
        <div className="relative max-w-md mx-auto">
          {/* Icon search */}
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="text-sm font-medium bg-white/20 px-3 py-1 rounded-md">
              💰 Số dư: <span className="font-bold">{formatCurrency(user.balanced)}</span>
            </div>
            {checkUserRank()}
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium shadow-md transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleLogin}
              className="px-4 py-1.5 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-medium shadow-md transition"
            >
              Login
            </button>
            <button
              onClick={handleSignin}
              className="px-4 py-1.5 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-sm font-medium shadow-md transition"
            >
              Signin
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

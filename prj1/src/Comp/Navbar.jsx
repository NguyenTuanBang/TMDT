import React from 'react'

const ranks = {
  bronze: { label: "Bronze", color: "bg-orange-500", icon: "🥉" },
  silver: { label: "Silver", color: "bg-gray-400", icon: "🥈" },
  gold: { label: "Gold", color: "bg-yellow-400", icon: "🥇" },
  platinum: { label: "Platinum", color: "bg-cyan-400", icon: "💎" },
};

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
  };

  const checkUserRank = () => {
    if (!user) return null;
    const { ranking } = user;
    return (
      <div className="flex items-center gap-2">
        <div className={`badge px-2 py-1 rounded-lg text-white ${ranks[ranking].color}`}>
          {ranks[ranking].icon}
        </div>
        {/* Avatar */}
        <img
          src={user.avatar || "https://via.placeholder.com/40"}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover border"
        />
      </div>
    );
  };

  return (
    <div className="flex justify-between items-center p-2 shadow">
      <div className="leftSide"></div>
      <div className="rightSide flex items-center gap-4">
        {user ? (
          <>
            <div>Số dư: {user.balanced}</div>
            {checkUserRank()}
            <button
              onClick={handleLogout}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() =>
              setUser({
                username: "User",
                ranking: "gold",
                balanced: 1000,
                avatar: "https://i.pravatar.cc/40",
              })
            }
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

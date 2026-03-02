import React, { useContext, useEffect, useState } from "react";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from "react-router-dom";

const SideMenu = ({ activeMenu, onMenuClick }) => {
  const { user, clearUser } = useContext(UserContext);
  const [SideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (onMenuClick) onMenuClick();
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
    }
    return () => { };
  }, [user]);

  return (
    <div
      className="w-64 h-[calc(100vh-64px)] flex flex-col overflow-y-auto"
      style={{
        background: "var(--sidebar-bg)",
        backdropFilter: "blur(28px) saturate(2)",
        WebkitBackdropFilter: "blur(28px) saturate(2)",
        borderRight: "1px solid var(--border-str)",
        transition: "background 0.3s ease",
      }}
    >
      {/* User profile section */}
      <div
        className="flex items-center gap-3 px-4 pt-4 pb-4 mx-3 mt-3 rounded-2xl"
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border-str)",
        }}
      >
        {/* Avatar */}
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-12 h-12 rounded-2xl object-cover border-2 border-white/20 flex-shrink-0"
          />
        ) : (
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #5200FF, #F900FF)",
              boxShadow: "0 4px 16px rgba(82,0,255,0.50)",
            }}
          >
            {user?.name?.[0]?.toUpperCase()}
          </div>
        )}

        {/* Text info */}
        <div className="min-w-0">
          {/* Name + role badge on same line */}
          <div className="flex items-center gap-2 flex-wrap">
            <h5 className="text-sm font-semibold leading-tight truncate" style={{ color: "var(--text-1)" }}>
              {user?.name || ""}
            </h5>
            <span
              className="text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded-full uppercase flex-shrink-0"
              style={user?.role === 'admin'
                ? { background: "linear-gradient(135deg, #5200FF, #F900FF)", color: "#fff" }
                : { background: "rgba(82,0,255,0.18)", color: "#5200FF", border: "1px solid rgba(82,0,255,0.35)" }}
            >
              {user?.role === 'admin' ? 'Admin' : 'Member'}
            </span>
          </div>
          {/* Email below */}
          <p className="text-[11px] mt-0.5 truncate" style={{ color: "var(--text-3)" }}>
            {user?.email || ""}
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {SideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-3 text-[13px] rounded-xl py-2.5 px-4 cursor-pointer transition-all duration-200`}
            style={activeMenu === item.label ? {
              background: "rgba(82,0,255,0.22)",
              border: "1px solid rgba(82,0,255,0.45)",
              boxShadow: "0 4px 16px rgba(82,0,255,0.20)",
              color: "var(--text-1)",
              fontWeight: 600,
            } : {
              background: "transparent",
              border: "1px solid transparent",
              color: "var(--text-3)",
            }}
            onClick={() => handleClick(item.path)}
          >
            <item.icon
              className="text-lg flex-shrink-0"
              style={{ color: activeMenu === item.label ? "#5200FF" : "var(--text-3)" }}
            />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom gradient line */}
      <div className="h-px mx-3 mb-0" style={{ background: "linear-gradient(90deg, transparent, var(--border-str), transparent)" }} />
    </div>
  );
};

export default SideMenu;
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
    <div className="w-64 h-[calc(100vh-61px)] bg-white flex flex-col overflow-y-auto border-r border-gray-100">
      <div className="flex flex-col items-start px-5 pt-5 pb-3 border-b border-gray-100">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover bg-slate-200"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-semibold">
            {user?.name?.[0]?.toUpperCase()}
          </div>
        )}

        {user?.role === 'admin' && (
          <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-2">
            Admin
          </div>
        )}

        <h5 className="text-gray-900 font-medium mt-2 leading-5">
          {user?.name || ""}
        </h5>
        <p className="text-[12px] text-gray-500">{user?.email || ""}</p>
      </div>

      <nav className="flex-1 px-2 py-3">
        {SideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-3 text-[14px] rounded-lg py-2.5 px-4 mb-1 cursor-pointer transition-colors ${activeMenu === item.label
                ? "text-primary bg-blue-50 border-r-4 border-primary font-medium"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl flex-shrink-0" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SideMenu;
import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useTheme } from "../../context/ThemeContext";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const closeSideMenu = () => setOpenSideMenu(false);

  return (
    <>
      <div
        className="flex items-center gap-5 py-4 px-7 sticky top-0 z-30"
        style={{
          background: "var(--nav-bg)",
          backdropFilter: "blur(28px) saturate(2)",
          WebkitBackdropFilter: "blur(28px) saturate(2)",
          borderBottom: "1px solid var(--border-str)",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <button
          className="block lg:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg object-cover" style={{ boxShadow: "0 4px 14px rgba(82,0,255,0.50)" }} />
          <h2 className="text-sm font-semibold text-white/90 tracking-wide">Task Manager</h2>
        </div>

        {/* Spacer + right section */}
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 rounded-full px-3 py-1.5" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium" style={{ color: "var(--text-2)" }}>Online</span>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              /* Sun icon */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              /* Moon icon */
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {openSideMenu && (
        <>
          <div
            className="fixed inset-0 top-[64px] bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={closeSideMenu}
          />
          <div className="fixed top-[64px] left-0 z-50 lg:hidden shadow-2xl">
            <SideMenu activeMenu={activeMenu} onMenuClick={closeSideMenu} />
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
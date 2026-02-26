import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const closeSideMenu = () => setOpenSideMenu(false);

  return (
    <>
      <div className="flex items-center gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <button
          className="block lg:hidden text-black"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <h2 className="text-lg font-medium text-black">Task Manager</h2>
      </div>

      {/* Mobile sidebar overlay */}
      {openSideMenu && (
        <>
          <div
            className="fixed inset-0 top-[61px] bg-black/30 z-40 lg:hidden"
            onClick={closeSideMenu}
          />
          <div className="fixed top-[61px] left-0 z-50 lg:hidden shadow-xl">
            <SideMenu activeMenu={activeMenu} onMenuClick={closeSideMenu} />
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
import React, { useContext } from 'react';
import Navbar from './Navbar';
import { UserContext } from "../../context/UserContext";
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);

    return (
        <div className="">
            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className="flex">
                    <div className='hidden lg:block sticky top-[61px] h-[calc(100vh-61px)] flex-shrink-0'>
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    <div className="flex-1 min-w-0 px-5">{children}</div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
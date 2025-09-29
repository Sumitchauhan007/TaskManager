import {
    LuLayoutDashboard,
    LuUsers,
    LuClipboardCheck,
    LuSquarePlus,
    LuLogOut,  // Changed from LuLogout to LuLogOut
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/admin/dashboard"  // Changed from Path to path (lowercase)
    },
    {
        id: "02",
        icon: LuClipboardCheck,
        label: "Manage Tasks",
        path: "/admin/tasks"  // Changed from Path to path (lowercase)
    },
    {
        id: "03",
        icon: LuSquarePlus,
        label: "Create Task",
        path: "/admin/create-task"  // Changed from Path to path (lowercase)
    },
    {
        id: "04",
        icon: LuUsers,
        label: "Team Members",
        path: "/admin/users",
    },
    {
        id: "05",
        icon: LuLogOut,  // Changed from LuLogout to LuLogOut
        label: "Logout",
        path: "logout",
    },
];

export const SIDE_MENU_USER_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/user/dashboard",
    },
    {
        id: "02",
        icon: LuClipboardCheck,
        label: "My Tasks",
        path: "/user/tasks",
    },
    {
        id: "03",
        icon: LuLogOut,  // Changed from LuLogout to LuLogOut
        label: "Logout",
        path: "logout",
    },
];

export const PRIORITY_DATA = [
    {label: "Low", value: "Low"},
    {label: "Medium", value: "Medium"},
    {label: "High", value: "High"},
]

export const STATUS_DATA = [
    {label: "Pending", value: "Pending"},
    {label: "In Progress", value: "In Progress"},
    {label: "Completed", value: "Completed"},
]
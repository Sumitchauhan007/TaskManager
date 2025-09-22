import {
    LuLayoutDashboard,
    LuUsers,
    LuClipboardCheck,
    LuSquarePlus,
    LuLogout,
} from "react-icons/lu";

export const SIDE_MENU_ITEMS = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        Path: "/admin/dashboard"
    },
    {
        id: "02",
        icon: LuClipboardCheck,
        label: "Manage Tasks",
        Path: "/admin/tasks"
    },
    {
        id: "03",
        icon: LuSquarePlus,
        label: "Create Task",
        Path: "/admin/create-task"
    },
    {
        id: "04",
        icon: LuUsers,
        label: "Team Members",
        path: "/admin/users",
    },
    {
        id: "05",
        icon: LuLogout,
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
        icon: LuLogout,
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
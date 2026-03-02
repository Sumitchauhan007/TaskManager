import {
    LuLayoutDashboard,
    LuUsers,
    LuClipboardCheck,
    LuSquarePlus,
    LuLogOut,
    LuNotebookPen,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/admin/dashboard"
    },
    {
        id: "02",
        icon: LuClipboardCheck,
        label: "Manage Tasks",
        path: "/admin/tasks"
    },
    {
        id: "03",
        icon: LuSquarePlus,
        label: "Create Task",
        path: "/admin/create-task"
    },
    {
        id: "04",
        icon: LuUsers,
        label: "Team Members",
        path: "/admin/users",
    },
    {
        id: "05",
        icon: LuNotebookPen,
        label: "Personal Tasks",
        path: "/personal-tasks",
    },
    {
        id: "06",
        icon: LuLogOut,
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
        icon: LuNotebookPen,
        label: "Personal Tasks",
        path: "/personal-tasks",
    },
    {
        id: "04",
        icon: LuLogOut,
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
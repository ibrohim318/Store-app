import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../theme/ThemeContext";
import toast from "react-hot-toast";

// ? icons
import { TiFlashOutline } from "react-icons/ti";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa";
import { IoReceiptOutline } from "react-icons/io5";
import { LuWarehouse } from "react-icons/lu";
import { IoPricetagsOutline } from "react-icons/io5";

import { useState } from "react";

function Navbar() {
    const [menu, setMenu] = useState(true)
    function toggleMenu() {
        setMenu(!menu)
    }

    const { theme, toggleTheme } = useTheme();

    const menus = [
        {
            icon: LuLayoutDashboard,
            name: "Dashboard",
            path: "/"
        },
        {
            icon: IoCartOutline,
            name: "Orders",
            path: "/orders"
        },
        {
            icon: IoReceiptOutline,
            name: "Sales",
            path: "/sales"
        },
        {
            icon: LuWarehouse,
            name: "Warehouse",
            path: "/warehouse"
        },
        {
            icon: IoPricetagsOutline,
            name: "Products",
            path: "/products"
        },
    ]
    // logout 
    const navigate = useNavigate();
    const { logout, currentUser } = useAuth();
    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Tizimdan chiqdingiz");
            navigate("/auth");
        } catch (err) {
            toast.error("Chiqishda xatolik yuz berdi");
        }
    };
    // user
    function getInitials(name) {
        if (!name) return "User";
        const parts = name.trim().split(" ");
        if (parts.length === 1) return parts[0][0].toUpperCase();
        return (parts[0][0] + parts[1][0]).toUpperCase();
    };

    return (
        <div className={`relative ${menu ? "w-55 transition-all duration-200" : "w-17 transition-all duration-200"}  h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 flex flex-col`}>
            {/* Logo */}
            <div className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-800">
                <div className="p-2 ml-2 bg-[#4f46e5] rounded-md flex items-center justify-center text-white font-light">
                    <TiFlashOutline />
                </div>
                <h1 className="font-semibold text-md text-slate-800 dark:text-slate-100">{menu ? "Storefront" : ""}</h1>
            </div>

            <button onClick={toggleMenu} className={`absolute top-15 cursor-pointer -right-3 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 shadow-sm transition-colors ${menu ? "transition-all duration-200" : "rotate-180 transition-all duration-200"}`} title="Yig'ish"> <FaChevronLeft size={10} /></button>
            {/* menus */}
            <div className="px-2">
                <h3 className="pl-2 font-mono text-[14px] my-2 text-[#9aa8bc] dark:text-slate-500">{menu ? "MAIN" : ""}</h3>
                <div>
                    {menus?.map(elem => {
                        const Icon = elem.icon;
                        return (
                            <NavLink key={elem.name} to={elem.path} className={({ isActive }) => `w-full h-[38px] flex items-center gap-3 px-2 rounded-lg transition-colors text-md font-mono mt-1 ${isActive ? "bg-[#eef2ff] dark:bg-indigo-950 text-[#433dcb] dark:text-indigo-300" : "text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white"}`}> <Icon className={`${menu ? " text-lg" : "ml-2 text-lg"} `} /> <h3>{menu ? elem.name : ""}</h3></NavLink>
                        );
                    })}
                </div>
            </div>

            {/* settings and user */}
            <div className="mt-auto border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between px-3 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className={`w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0 ${menu ? "" : "ml-1"}`}>
                            {getInitials(currentUser?.displayName)}
                        </div>
                        {menu ? (
                            <div className={`overflow-hidden`}>
                                <p className="text-xs font-medium text-slate-800 dark:text-slate-100 truncate">{currentUser?.displayName || "Foydalanuvchi"}</p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{currentUser?.email}</p>
                            </div>) : ("")}
                    </div>
                    {menu ? (
                        <button onClick={handleLogout} className="text-slate-400 dark:text-slate-500 cursor-pointer hover:text-red-600 dark:hover:text-red-500 text-lg transition-colors flex-shrink-0 ml-2" title="Chiqish"><IoIosLogOut size={18} /></button>
                    ) : ('')}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
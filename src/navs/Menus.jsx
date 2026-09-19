import { useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";


import { useTheme } from "../theme/ThemeContext";

function Menus() {
    const { theme, toggleTheme } = useTheme();

    const location = useLocation();
    const page = location.pathname;
    let pageName = "";

    switch (page) {
        case "/": pageName = "Dashboard"; break;
        case "/orders": pageName = "Orders"; break;
        case "/sales": pageName = "Sales"; break;
        case "/warehouse": pageName = "Warehouse"; break;
        default: pageName = "Unknown"; break;
    }

    // dates
    const today = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[today.getMonth()].slice(0, 3);
    const day = today.getDate();
    const year = today.getFullYear();

    return (
        <div className="py-2.5 px-4 bg-white dark:bg-slate-900 border-b-1 border-gray-200 dark:border-gray-500 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{pageName}</h1>
                <div className="px-2.5 py-1 text-gray-400 dark:text-gray-500 text-xs rounded-md bg-[#f1f5f9] dark:bg-slate-800 dark:text-gray-400 whitespace-nowrap">
                    {month} {day}, {year}
                </div>
            </div>

            <div className="relative w-[320px] h-9 flex items-center justify-end gap-3">
                {/* search */}
                <div className="absolute right-10 top-0 group w-[220px] hover:w-[260px] focus-within:w-[260px] transition-all duration-300 ease-in-out">
                    <input type="text" placeholder="Search..." className="w-full h-9 pl-9 pr-12 rounded-lg text-sm bg-[#f1f5f9] dark:bg-slate-800 border border-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-colors duration-300 ease-in-out focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900" />
                    <IoSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                </div>

                {/* dark/light modes */}
                <button onClick={toggleTheme} className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors" title="Rejimni almashtirish">
                    {theme === "light" ? <IoMoonOutline size={18} /> : <IoSunnyOutline size={18} />}
                </button>
            </div>
        </div>
    );
}

export default Menus;
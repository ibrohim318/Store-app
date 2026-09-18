import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import toast from "react-hot-toast";

// ? icons
import { TiFlashOutline } from "react-icons/ti";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { BsBox } from "react-icons/bs";
import { LuChartColumnIncreasing } from "react-icons/lu";
import { FaChevronLeft } from "react-icons/fa";


function Navbar() {
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


    const menus = [
        {
            icon: LuLayoutDashboard,   // satr emas, komponentning o'zi
            name: "Dashboard",
            path: "/"
        },
        {
            icon: IoCartOutline,
            name: "Orders",
            path: "/orders"
        },
        {
            icon: IoPeopleOutline,
            name: "Customers",
            path: "/customers"
        },
        {
            icon: BsBox,
            name: "Products",
            path: "/products"
        },
        {
            icon: LuChartColumnIncreasing,
            name: "Analytics",
            path: "/analytics"
        },
    ]

    return (
        <div className="w-40 h-screen border-r border-gray-200 bg-white flex flex-col">
            {/* Logo */}
            <div className="flex items-center  gap-2 p-3 border-b border-gray-200">
                <div className="p-1 bg-[#4f46e5] rounded-md flex items-center justify-center text-white font-light"><TiFlashOutline /></div>
                <h1 className="font-semibold text-xs">Storefront</h1>
            </div>
            <div className="px-2">
                <h3 className="font-mono text-[10px] my-2 text-[#9aa8bc] font-normal">MAIN</h3>
                <div>
                    {menus?.map(elem => {
                        const Icon = elem.icon;
                        return (
                            <NavLink key={elem.name} to={elem.path} className={({ isActive }) => `w-full h-[25px] flex items-center gap-3 px-2 rounded-lg transition-colors text-xs font-mono mt-1 ${isActive ? "bg-[#eef2ff] text-[#433dcb]" : "text-gray-400 hover:text-black"}`}>
                                <Icon />
                                <h3>{elem.name}</h3>
                            </NavLink>
                        );
                    })}
                </div>
                <h1 onClick={handleLogout} className="cursor-pointer text-red-500">Logout</h1>
            </div>
        </div>
    );
}

export default Navbar;
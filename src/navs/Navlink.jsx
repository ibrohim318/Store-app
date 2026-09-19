import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Menus from "./Menus";

function Layout() {
    return (
        <div className="flex h-screen">
            <Navbar />
            <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#0f172a]">
                <Menus />
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
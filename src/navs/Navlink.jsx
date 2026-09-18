import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
    return (
        <div className="flex h-screen">
            <Navbar />
            <main className="flex-1 overflow-y-auto bg-gray-50">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
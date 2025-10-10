import React, {useState} from "react";
import {Bars3Icon} from "@heroicons/react/24/solid";
import Header from "./content/Header";
import Footer from "./content/Footer";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen min-w-screen">

            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="flex flex-col w-full lg:pl-64 pl-0">
                <div className="flex py-1 px-2">
                    <button
                        type="button"
                        className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <Header />
                </div>
                <div className="flex px-2 py-2">
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Layout;
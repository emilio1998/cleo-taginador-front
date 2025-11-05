import React, {useState} from "react";
import {Bars3Icon} from "@heroicons/react/24/solid";
import Header from "./content/Header";
import Footer from "./content/Footer";
import Sidebar from "./Sidebar";

const Layout = ({ children, tituloHeader }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen min-w-screen">

            {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

            <div className="flex flex-col w-full lg:pl-64 pl-0">
                <div className="relative py-1 px-2">
                    {/* <button
                        type="button"
                        className="absolute top-2 left-2 border border-gray-200 p-3 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 lg:hidden bg-white cursor-pointer"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button> */}

                    <Header titulo={tituloHeader} />
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
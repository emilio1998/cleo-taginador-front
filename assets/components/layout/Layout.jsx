import React, {useState} from "react";
import Header from "./content/Header";
import Footer from "./content/Footer";

const Layout = ({ children, tituloHeader }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen min-w-screen">

            <div className="flex flex-col w-full pl-0">
                
                {/* Header para pantallas grandes (solo lg y superior) */}
                <div className="relative py-1 px-2 hidden lg:flex">
                    <Header titulo={tituloHeader} />
                </div>

                {/* Header para pantallas pequeñas */}
                <div className="relative py-1 px-2 lg:hidden">
                    <Header titulo={tituloHeader} />
                </div>

                <div className="flex px-2 py-2 max-w-5xl mx-auto w-full justify-center">
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Layout;
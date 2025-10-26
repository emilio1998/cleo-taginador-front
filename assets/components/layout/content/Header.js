import React from "react";
import engranaje from "../../../images/icons/engranaje.svg";

const Header = ({ titulo="Inicio" }) => {
    return (
        <header className="flex items-center justify-between h-16 px-6 border-b border-primary/20 dark:border-primary/30 w-full">
            <h1 className="text-2xl font-bold">{titulo}</h1>

            <div className="flex items-center gap-4">
                <div className="relative group">
                    <button className="flex items-center justify-center rounded-full size-10 bg-primary/20 dark:bg-primary/30 text-primary">
                        <img src={engranaje} alt="Logo de engranaje" className="w-10 h-auto cursor-pointer" />
                    </button>
                    {/* <div className="absolute right-0 hidden mt-2 w-48 bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 rounded-lg shadow-lg group-hover:block">
                        
                    </div> */}
                </div>
                <div 
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    style={{
                        backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBoDE8pE-2Y7Y0XIRAQCV0QJKla1fZc8FEKI_pS0L4Y735lMvWET0myuhQ0qo0po65pQRKBcediEno8iBGrVVHLoaCI8MQEboeeC0--ooNJlZ1hnpWQNT2iL31H-0P96aFS8Xx6naMazykJJTsuTCP8nrdWYqBR9SYiu_UFyH00oYFuep960ZxDpSkgnPCjPjh8mG3vy_hw5pnw254Ffh6Sre1gZsy06OukQGdy-vj0hrOQVMuJ8qy8azCwlNMn6F0RxCVOTCHgYk39")'
                    }}
                />
            </div>
        </header>
    )
}

export default Header;
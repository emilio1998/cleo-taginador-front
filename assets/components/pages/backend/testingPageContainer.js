import React from "react";

const TestingPageContainer = () => {
    return (
        <div className="min-h-screen flex w-full items-start justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <div className="bg-white rounded-xl shadow-lg p-10 text-center mt-20">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-orange-500 drop-shadow-[2px_2px_0px_black]">
                    Bienvenido a la Página CLEO-TAGINADOR!!
                </h1>
                <p className="text-blue-500">Bienvenido a tu aplicación React con Tailwind CSS.</p>
            </div>
        </div>
    );
};

export default TestingPageContainer;

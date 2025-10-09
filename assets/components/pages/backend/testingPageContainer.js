import React from "react";

const TestingPageContainer = () => {
    return (
        <div className="min-h-screen flex w-full items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <div className="bg-white rounded-xl shadow-lg p-10 text-center">
                <h1 className="text-3xl font-bold text-green-700 mb-2">Hello, CLEO-TAGINADOR!</h1>
                <p className="text-blue-500">Bienvenido a tu aplicación React con Tailwind CSS.</p>
            </div>
            <div className="p-4">
                <p className="text-red-500">Texto rojo Tailwind</p>
                <p className="text-blue-500">Texto azul Tailwind</p>
            </div>
        </div>
    );
};

export default TestingPageContainer;

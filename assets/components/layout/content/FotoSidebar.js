import React from "react";
import {Link} from "react-router-dom";

export default function FotoSidebar({foto, titulo}) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-20 h-20 text-primary">
                <Link
                    className="flex justify-center items-center"
                    to="/"
                >
                    <img src={foto} className="w-20 h-20 object-contain cursor-pointer text-blue-500" />
                </Link>
            </div>
            <h2 className="text-lg font-bold">{titulo}</h2>
        </div>
    )
}
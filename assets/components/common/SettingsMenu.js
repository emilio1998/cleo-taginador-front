import { useRef, useEffect } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function SettingsMenu({ openOption, setOpenOptions, opciones }) {
    const settingsRef = useRef();
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (openOption && settingsRef.current && !settingsRef.current.contains(event.target)) {
                setOpenOptions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openOption]);

    return (
        <div className="relative" ref={settingsRef}>
            <button
                onClick={() => setOpenOptions(!openOption)}
                className="flex items-center justify-center rounded-full size-10 bg-transparent hover:bg-slate-100 text-slate-600 focus:outline-none active:scale-95 transition-transform cursor-pointer"
            >
                <Cog6ToothIcon className="h-8 w-8" aria-hidden="true" />
            </button>

            {openOption && opciones && opciones()}
        </div>
    );
}
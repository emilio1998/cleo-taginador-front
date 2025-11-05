import React, { useState, useEffect, useRef } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ComboBoxImage({ selectedElement=null, onSelectElement, list, mobil=false }) {

    const [isOpen, setIsOpen] = useState(false);

    const comboboxRef = useRef(null);

    const handleSelect = (elemento) => {
        onSelectElement(elemento);
        setIsOpen(false);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (isOpen && comboboxRef.current && !comboboxRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <div className={classNames(`relative w-${mobil ? '16' : '64'}`)} ref={comboboxRef}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                    <span className="flex items-center gap-2">
                        {selectedElement ? (
                            <>
                                <img
                                    src={selectedElement.imageUrl}
                                    alt={selectedElement.name}
                                    className="h-6 w-6 rounded-full object-cover"
                                />
                                {!mobil && <span>{selectedElement.name}</span>}
                            </>
                        ) : (
                            <span className="text-gray-500">Selecciona un Elemento</span>
                        )}
                    </span>

                    <svg
                        className="-mr-1 ml-2 h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                {/* 4. Menú desplegable (se muestra condicionalmente) */}
                {isOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
                        <ul className="py-1">
                            {/* 5. Mapea cada fruta a un elemento de la lista */}
                            {list.map((elemento) => (
                                <li
                                    key={elemento.name}
                                    onClick={() => handleSelect(elemento)}
                                    className="flex cursor-pointer items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    {/* La "foto" (emoji) y el texto */}
                                    <img
                                        src={elemento.imageUrl}
                                        alt={elemento.name}
                                        className="h-6 w-6 object-cover"
                                    />
                                    {!mobil && <span>{elemento.name}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
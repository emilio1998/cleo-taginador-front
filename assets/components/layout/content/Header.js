import React, {useState, useEffect, useRef} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import engranaje from "../../../images/icons/engranaje.svg";
import image1 from '../../../images/icons/image1.svg';
import tagSelector from "../../../images/tag-selector.png";
import carritoCompra from '../../../images/carritoCompra.png';
import deTodo from '../../../images/deTodo.png';
import hetero from '../../../images/hetero.png';
import homo from '../../../images/homo.png';
import {Bars3Icon} from "@heroicons/react/24/solid";
import FotoSidebar from './FotoSidebar';
import ComboBoxImage from "./common/inputs/ComboBoxImage";
import { listarPostsPorGrupo, listarTags, listarPostsPorTag } from "../../../redux/actions/busquedaTagsActions";

const fruits = [
  { name: 'Todo', imageUrl: deTodo },
  { name: 'Hetero', imageUrl: hetero },
  { name: 'Homo', imageUrl: homo }
];

const Header = ({ titulo="Inicio" }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(fruits[0]);

    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const [idGrupoSeleccionado, setIdGrupoSeleccionado] = useState(0);

    const [menuOpen, setMenuOpen] = useState(false);

    const url = window.location.href;

    const listarPostsPorTagFunc = () => {
        dispatch(listarPostsPorTag())
            .then((res) => {
                if (res.status) {
                    if (res.status === 200) {
                        // Aquí puedes manejar la respuesta exitosa
                        console.log("Posts:", res.data);
                        const posts = res.data.data;
                        const postQuemado1 = {
                            "ID": 12,
                            "title": "PostQuemado1",
                            "color": "#F97316",
                            "posts": []
                        }

                        const postQuemado2 = {
                            "ID": 13,
                            "title": "PostQuemado2",
                            "color": "#F97316",
                            "posts": []
                        }
                        setPosts([...posts, postQuemado1, postQuemado2]);
                    } else {
                        console.log("Error al listar posts por grupo:", res);
                    }
                } else {
                    console.log("Error en la respuesta:", res);
                }
            });
    }

    useEffect(() => {
        listarPostsPorTagFunc();
    }, []);

    const menuRef = useRef();

    
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="flex flex-col w-full">
            <header className="flex items-center justify-between px-6 border-b border-primary/20 dark:border-primary/30 w-full">
                <div className="hidden md:flex flex items-center">
                    <FotoSidebar foto={image1} titulo="CLEO-TAGINADOR" />
                </div>

                <div className="flex items-center gap-15">
                    <div class="w-full md:min-w-[400px] lg:min-w-[500px]">
                        <div class="relative flex items-center">

                            <input
                                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-5 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Buscar..."
                            />

                            <button
                                class="rounded-md ml-2 bg-slate-800 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                    <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="ml-auto p-3 border border-transparent rounded-full bg-gradient-to-r from-slate-600 to-slate-800 text-white shadow-md hover:scale-110 hover:rotate-3 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 sm:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <div className="hidden md:flex flex items-center gap-4">
                    <ComboBoxImage
                        selectedElement={categoriaSeleccionada}
                        onSelectElement={setCategoriaSeleccionada}
                        list={fruits}
                    />
                    <button className="flex items-center justify-center rounded-full size-10 bg-primary/20 dark:bg-primary/30 text-primary">
                        <img src={carritoCompra} alt="Carrito Compra" className="w-10 h-auto cursor-pointer" />
                    </button>
                    <button className="flex items-center justify-center rounded-full size-10 bg-primary/20 dark:bg-primary/30 text-primary">
                        <img src={tagSelector} alt="Logo de Tags Selector" className="w-10 h-auto cursor-pointer" />
                    </button>
                    <button className="flex items-center justify-center rounded-full size-10 bg-primary/20 dark:bg-primary/30 text-primary">
                        <img src={engranaje} alt="Logo de engranaje" className="w-10 h-auto cursor-pointer" />
                    </button>
                    <button
                        onClick={() => console.log("Foto clickeada")}
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 focus:outline-none active:scale-95 transition-transform cursor-pointer"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBoDE8pE-2Y7Y0XIRAQCV0QJKla1fZc8FEKI_pS0L4Y735lMvWET0myuhQ0qo0po65pQRKBcediEno8iBGrVVHLoaCI8MQEboeeC0--ooNJlZ1hnpWQNT2iL31H-0P96aFS8Xx6naMazykJJTsuTCP8nrdWYqBR9SYiu_UFyH00oYFuep960ZxDpSkgnPCjPjh8mG3vy_hw5pnw254Ffh6Sre1gZsy06OukQGdy-vj0hrOQVMuJ8qy8azCwlNMn6F0RxCVOTCHgYk39")',
                        }}
                    />
                </div>

                {menuOpen && (
                    <div
                        ref={menuRef}
                        className="absolute lg:hidden top-15 right-0 mt-2 w-20 bg-white dark:bg-gray-400 shadow-lg rounded-md flex flex-col items-center gap-4 p-3 z-50"
                    >
                        <ComboBoxImage
                            selectedElement={categoriaSeleccionada}
                            onSelectElement={setCategoriaSeleccionada}
                            list={fruits}
                            mobil={true}
                        />
                        <button className="flex items-center justify-center rounded-full size-10 bg-primary/20 dark:bg-primary/30 text-primary">
                            <img src={carritoCompra} alt="Carrito Compra" className="w-10 h-auto cursor-pointer" />
                        </button>
                        <button className="flex items-center justify-center rounded-full size-10 bg-primary/20 dark:bg-primary/30 text-primary">
                            <img src={tagSelector} alt="Logo de Tags Selector" className="w-10 h-auto cursor-pointer" />
                        </button>
                        <button className="flex items-center justify-center rounded-full size-10 bg-primary/20 dark:bg-primary/30 text-primary">
                            <img src={engranaje} alt="Logo de engranaje" className="w-10 h-auto cursor-pointer" />
                        </button>
                        <button
                            onClick={() => console.log("Foto clickeada")}
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 focus:outline-none active:scale-95 transition-transform cursor-pointer"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBoDE8pE-2Y7Y0XIRAQCV0QJKla1fZc8FEKI_pS0L4Y735lMvWET0myuhQ0qo0po65pQRKBcediEno8iBGrVVHLoaCI8MQEboeeC0--ooNJlZ1hnpWQNT2iL31H-0P96aFS8Xx6naMazykJJTsuTCP8nrdWYqBR9SYiu_UFyH00oYFuep960ZxDpSkgnPCjPjh8mG3vy_hw5pnw254Ffh6Sre1gZsy06OukQGdy-vj0hrOQVMuJ8qy8azCwlNMn6F0RxCVOTCHgYk39")',
                            }}
                        />
                    </div>
                )}
            </header>

                {/* Sección para que el usuario seleccione un grupo */}
                {/* Barra única de grupos con wrap en varias líneas si no caben */}
                <div className="w-full" style={{ maxWidth: '100vw' }}>
                    <div
                        className="flex flex-wrap gap-2 w-full justify-center mx-auto"
                        style={{ maxWidth: '100vw', minWidth: 0, padding: '0.5rem 0' }}
                    >
                        {posts.map((post, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => {
                                    if (post.ID === 0) {
                                        navigate(`/`);
                                    } else navigate(`/?grupo=${post.ID}`)
                                }}
                                className="flex items-center justify-center px-6 py-2 rounded-full border-2 border-blue-600 bg-white text-blue-700 text-base font-semibold shadow-sm transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                style={{ minWidth: '3.5rem', minHeight: '2.5rem', whiteSpace: 'nowrap' }}
                            >
                                {post.title}
                            </button>
                        ))}
                    </div>
                </div>
        </div>
    )
}

export default Header;
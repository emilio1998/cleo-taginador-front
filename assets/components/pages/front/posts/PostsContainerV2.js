import React, {useEffect} from 'react';
import img from '../../../../images/imagen.png'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { listarPosts } from '../../../../redux/actions/busquedaPostsActions';
import { listarImagenesPorPost } from '../../../../redux/actions/busquedaTagsActions';
import loading from '../../../../images/gif/loading.gif'

const PostsContainerV2 = ({ setMostrarTags }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [posts, setPosts] = useState([])
    const [segundaPagina, setSegundaPagina] = useState(false)
    const [carpetaSeleccionada, setCarpetaSeleccionada] = useState({})
    const [imagenes, setImagenes] = useState([])
    const [tagsPorPost, setTagsPorPost] = useState([])
    const [idGrupoSeleccionado, setIdGrupoSeleccionado] = useState(0);

    const [searchParams] = useSearchParams();

    const { listandoPostsPorTag, listandoImagenesPorPost } = useSelector(state => state.busquedaTags);

    const listarPostsFunc = () => {
        dispatch(listarPosts())
            .then((res) => {
                if (res.status) {
                    if (res.status === 200) {
                        const data = res.data.data
                        console.log("RES: ", data)
                        setPosts(data)
                    } else {
                        console.log("Error al listar posts:", res);
                    }
                } else {
                    console.log("Error en la respuesta:", res);
                }
            })
    }

    const listarImagenesPorPostFunc = () => {
        dispatch(listarImagenesPorPost(carpetaSeleccionada))
            .then((res) => {
                if (res.status) {
                    if (res.status === 200) {
                        const data = res.data.data
                        const dataTags = res.data.dataTags
                        console.log("RES IMAGENES: ", data)
                        setImagenes(data)
                        setTagsPorPost(dataTags)
                    } else {
                        console.log("Error al listar imágenes por post:", res);
                    }
                } else {
                    console.log("Error en la respuesta:", res);
                }
            })
    }

    useEffect(() => {
        listarPostsFunc();
    }, [])

    useEffect(() => {
        if (segundaPagina) {
            listarImagenesPorPostFunc();
        }
    }, [segundaPagina]);

    useEffect(() => {
        const params = searchParams;

        //POR GRUPO
        if (params.has("grupo")) {
            // El parámetro "grupo" existe
            console.log("El parámetro grupo existe:", params.get("grupo"));
            setIdGrupoSeleccionado(params.get("grupo"));
        } else {
            // El parámetro "grupo" NO existe
            console.log("El parámetro grupo NO existe");
            setIdGrupoSeleccionado(0);
        }
    }, [searchParams]);
    
    return (
        <>
            {segundaPagina && (
                <div className="relative mb-6 -left-4">
                    <a onClick={() => {
                        setSegundaPagina(false)
                        setCarpetaSeleccionada({})
                        setMostrarTags(true)
                    }} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 hover:bg-white shadow-sm border border-gray-200 text-sm font-medium cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        REGRESAR
                    </a>
                </div>
            )}
            <div className="relative flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm"
                 style = {{width: !segundaPagina ? "500px" : "1000px"}}
            >
                {!segundaPagina ? (
                    listandoPostsPorTag ? (
                        <div className="flex justify-center items-center h-full">
                            <img src={loading} alt="Loading..." />
                        </div>
                    ) : (
                        <nav className="flex min-w-[240px] flex-col gap-1 p-1.5">
                            {posts.length > 0 ? (
                                posts.find(p => p.ID === parseInt(idGrupoSeleccionado)) && (
                                    posts.find(p => p.ID === parseInt(idGrupoSeleccionado)).posts.map((post, index) => (
                                        <div
                                            role="button"
                                            class="text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 cursor-pointer"
                                            onClick={() => {
                                                setCarpetaSeleccionada(post)
                                                setSegundaPagina(true)
                                                setMostrarTags(false)
                                            }}
                                        >
                                            <div class="mr-4 grid place-items-center">
                                                <img
                                                    src={post.IMAGENES.imagenPrincipal.srcBase64}
                                                    class="relative inline-block h-12 w-12 aspect-square rounded-2xl object-cover object-center"
                                                />
                                            </div>
                                            <div>
                                                <h6 class="text-slate-800 font-medium">
                                                    {post.TITULO || "umekoj0910"}
                                                </h6>
                                                <p class="text-slate-500 text-sm">
                                                    {post.IMAGENES.videos || 0} videos {post.IMAGENES.fotos || 0} Fotos
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )
                            ) : (
                                <p>No posts available</p>
                            )}
                        </nav>
                    )
                ) : (
                    listandoImagenesPorPost ? (
                        <div className="flex justify-center items-center h-full">
                            <img src={loading} alt="Loading..." />
                        </div>
                    ) : (
                        <div class="w-full flex-1 flex gap-4 p-4">

                            {/* Columna 1: DIV (Imagen) arriba + DIV abajo. Al cambiar el alto del de arriba, el de abajo (flex-1) se ajusta para compensar, sin alterar el alto total de la columna */}
                            <div class="flex flex-col flex-1 gap-4">
                                <h6 className="text-xl font-bold tracking-wide bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent justify-center text-center">
                                    {carpetaSeleccionada.TITULO || "umekoj0910"}
                                </h6>
                                <div class="relative flex items-center justify-center h-[500px]">
                                    <div
                                        class="flex items-center justify-center w-full h-full pt-20 pb-10 px-10"
                                    >
                                        <img src={carpetaSeleccionada.IMAGENES.imagenPrincipal.srcBase64} alt="Loading..." class="max-w-full max-h-full object-contain" />
                                    </div>
                                </div>

                                <div class="relative flex flex-1 items-center justify-center border-[4px] border-black">
                                    <div class="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span class="text-xl font-bold tracking-wide bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                            Usuario:
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Columna 2: independiente de la columna 1 */}
                            <div class="flex flex-col flex-[1.5] gap-4">
                                <div class="relative flex flex-1 flex-col items-center justify-center gap-3 p-4">
                                    <span class="text-xl font-bold tracking-wide bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        TAGS
                                    </span>
                                    <div class="flex flex-wrap items-center justify-center gap-2">
                                        {tagsPorPost.map((tag, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => {
                                                    setSegundaPagina(false);
                                                    setCarpetaSeleccionada({});
                                                    setMostrarTags(true);
                                                    navigate(`/?grupo=${tag.ID}`)
                                                }}
                                                className="flex items-center justify-center px-4 py-1 rounded-full border-2 text-base font-semibold shadow-sm transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 shrink-0"
                                                style={{ 
                                                    minWidth: '3.5rem', 
                                                    minHeight: '2.5rem', 
                                                    whiteSpace: 'nowrap',
                                                    backgroundColor: "#ffffff",
                                                    color: tag.color ? tag.color : "#1D4ED8",
                                                    borderColor: tag.color ? tag.color : "#2563EB"
                                                }}
                                            >
                                                {tag.NOMBRE}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div class="relative flex flex-1 items-center justify-center">
                                    <div className="columns-2 sm:columns-3 md:columns-4 gap-3">
                                        {imagenes && imagenes.length > 0 ? (
                                            imagenes.map((imgDes, imgIndex) => (
                                                <img
                                                    key={imgIndex}
                                                    src={imgDes.srcBase64}
                                                    style={{ aspectRatio: `${imgDes.ancho} / ${imgDes.alto}` }}
                                                    className="mb-3 w-full break-inside-avoid rounded-lg object-cover"
                                                />
                                            ))
                                        ) : (
                                            <p className="text-slate-500 text-sm">Sin imágenes destacadas</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                )}
            </div>
        </>
    );
};

export default PostsContainerV2;
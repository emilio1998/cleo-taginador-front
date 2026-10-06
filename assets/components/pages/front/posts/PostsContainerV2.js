import React, {useEffect} from 'react';
import img from '../../../../images/imagen.png'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { listarPosts } from '../../../../redux/actions/busquedaPostsActions';
import { listarImagenesPorPost } from '../../../../redux/actions/busquedaTagsActions';
import loading from '../../../../images/gif/loading.gif'

const PostsContainerV2 = ({ setMostrarTags }) => {

    const dispatch = useDispatch();

    const [posts, setPosts] = useState([])
    const [segundaPagina, setSegundaPagina] = useState(false)
    const [carpetaSeleccionada, setCarpetaSeleccionada] = useState({})
    const [imagenes, setImagenes] = useState([])
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
                        console.log("RES IMAGENES: ", data)
                        setImagenes(data)
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
                        <div className="p-4 overflow-y-auto max-h-[80vh]">
                            {carpetaSeleccionada && (
                                <div key={carpetaSeleccionada.ID} className="mb-6">
                                    <h6 className="text-slate-800 font-medium mb-2">
                                        {carpetaSeleccionada.TITULO || "umekoj0910"}
                                    </h6>
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
                            )}
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default PostsContainerV2;
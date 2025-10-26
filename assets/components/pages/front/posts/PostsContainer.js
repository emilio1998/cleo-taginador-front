import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import imagen from '../../../../images/imagen.png';
import { listarGruposEtiquetas, listarTags, listarPostsPorGrupo } from "../../../../redux/actions/busquedaTagsActions";

const PostsContainer = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [grupoTags, setGrupoTags] = useState([]);
    const [posts, setPosts] = useState([]);
    const [idTagSeleccionado, setIdTagSeleccionado] = useState(null);
    const [idGrupoSeleccionado, setIdGrupoSeleccionado] = useState(0);

    const url = window.location.href;

    const listarTagsFunc = () => {
        dispatch(listarTags())
            .then((res) => {
                if (res.status) {
                    if (res.status === 200) {
                        // Aquí puedes manejar la respuesta exitosa
                        console.log("Tags:", res.data);
                        const tags = res.data.data;
                        setGrupoTags(tags);
                    } else {
                        console.log("Error al listar grupos de etiquetas:", res);
                    }
                } else{
                    console.log("Error en la respuesta:", res);
                }
            });
    }

    const listarPostsPorGrupoFunc = () => {
        dispatch(listarPostsPorGrupo())
            .then((res) => {
                if (res.status) {
                    if (res.status === 200) {
                        // Aquí puedes manejar la respuesta exitosa
                        console.log("Posts:", res.data);
                        const posts = res.data.data;
                        setPosts(posts);
                    } else {
                        console.log("Error al listar posts por grupo:", res);
                    }
                } else {
                    console.log("Error en la respuesta:", res);
                }
            });
    }

    useEffect(() => {
        listarTagsFunc();
        listarPostsPorGrupoFunc();
    }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has("grupo")) {
            // El parámetro "grupo" existe
            console.log("El parámetro grupo existe:", params.get("grupo"));
            setIdTagSeleccionado(params.get("grupo"));
        } else {
            // El parámetro "grupo" NO existe
            console.log("El parámetro grupo NO existe");
            setIdTagSeleccionado(null);
        }
    }, [url]);

    return (
        <div className="min-h-screen w-full flex flex-col items-start justify-start overflow-y-auto bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-10 space-y-8">
            <div className="w-full flex gap-3 p-3 overflow-x-auto bg-blue-300 scrollbar-hide">
                {posts.map((post, index) => (
                    <div key={index} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary pl-4 pr-4">
                        <p className="text-white text-sm font-medium leading-normal">{post.title}</p>
                    </div>
                ))}
            </div>
            {idTagSeleccionado ? (
                <>
                    <div className="mb-6">
                        <a href="/posts" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 hover:bg-white shadow-sm border border-gray-200 text-sm font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            Volver
                        </a>
                    </div>
                </>
            ) : (
                <div className="flex flex-wrap items-start justify-start gap-3">
                    {/* {grupoTags.map((item, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => navigate(`/posts?grupo=${item.ID}`)}
                            className="rounded-full px-4 py-2 bg-white border border-gray-200 text-base font-semibold cursor-pointer hover:bg-gray-100 transition"
                            style={{ color: item.color }}
                        >
                            {item.title}
                        </button>
                    ))} */}
                    <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {posts.length !== 0 && 
                            posts[idGrupoSeleccionado].posts.map((item, i) => (
                                <a href="#" class="group" key={i}>
                                    <img src={imagen} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
                                    <h3 class="mt-4 text-sm text-gray-700">{item.TITULO}</h3>
                                    {/* <p class="mt-1 text-lg font-medium text-gray-900">$48</p> */}
                                </a>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostsContainer;

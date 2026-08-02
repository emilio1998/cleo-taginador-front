import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import imagen from '../../../../images/imagen.png';
import { listarGruposEtiquetas, listarTags, listarPostsPorGrupo, listarPostsPorTag } from "../../../../redux/actions/busquedaTagsActions";

const PostsContainer = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const [idTagSeleccionado, setIdTagSeleccionado] = useState(null);
    const [idGrupoSeleccionado, setIdGrupoSeleccionado] = useState(0);

    const url = window.location.href;

    const listarPostsPorTagFunc = () => {
        dispatch(listarPostsPorTag())
            .then((res) => {
                if (res.status) {
                    if (res.status === 200) {
                        // Aquí puedes manejar la respuesta exitosa
                        const posts = res.data.data;
                        console.log("Posts:", posts);
                        setPosts(posts);
                    } else {
                        console.log("Error al listar posts por grupo:", res);
                    }
                } else {
                    console.log("Error en la respuesta:", res);
                }
            });
    }

    const listarTagsFunc = () => {
        dispatch(listarTags())
            .then((res) => {
                if (res.status) {
                    if (res.status === 200) {
                        // Aquí puedes manejar la respuesta exitosa
                        console.log("Tags PP:", res.data);
                        const tags = res.data.data;
                        setTags(tags);
                    } else {
                        console.log("Error al listar tags:", res);
                    }
                } else {
                    console.log("Error en la respuesta:", res);
                }
            });
    }

    useEffect(() => {
        listarPostsPorTagFunc();
        listarTagsFunc();
    }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has("tag")) {
            // El parámetro "tag" existe
            console.log("El parámetro tag existe:", params.get("tag"));
            setIdTagSeleccionado(params.get("tag"));
        } else {
            // El parámetro "tag" NO existe
            console.log("El parámetro tag NO existe");
            setIdTagSeleccionado(null);
        }

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
    }, [url]);

    return (
        <div className="min-h-screen w-full flex flex-col items-start justify-start overflow-y-auto bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-10 space-y-8">
            {!!idGrupoSeleccionado && (
                <>
                    <div className="mb-6">
                        <a href="/" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 hover:bg-white shadow-sm border border-gray-200 text-sm font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            TODOS
                        </a>
                    </div>
                </>
            )}
            <div className="flex flex-wrap items-start justify-start gap-3">
                <div class="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {posts.length !== 0 && 
                        posts.find(p => p.ID === parseInt(idGrupoSeleccionado)) && (
                            posts.find(p => p.ID === parseInt(idGrupoSeleccionado)).posts.map((item, i) => (
                                <a href="#" class="group flex flex-col items-center justify-center" key={i}>
                                    <img src={imagen} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="aspect-square w-40 h-40 rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8 mx-auto" />
                                    <h3 class="mt-3 text-base text-gray-700 text-center w-full">{item.TITULO}</h3>
                                </a>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default PostsContainer;

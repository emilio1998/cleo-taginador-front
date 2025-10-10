import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listarGruposEtiquetas } from "../../../../redux/actions/busquedaTagsActions";

const PostsContainer = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [grupoTags, setGrupoTags] = useState([]);
    const [idGrupoSeleccionado, setIdGrupoSeleccionado] = useState(null);

    const url = window.location.href;

    const listarGruposEtiquetasFunc = () => {
        dispatch(listarGruposEtiquetas())
            .then((res) => {
                if (res.status) {
                    if (res.status === 200) {
                        // Aquí puedes manejar la respuesta exitosa
                        console.log("Grupos de etiquetas:", res.data);
                        const grupoTags = res.data.data;
                        setGrupoTags(grupoTags);
                    } else {
                        console.log("Error al listar grupos de etiquetas:", res);
                    }
                } else{
                    console.log("Error en la respuesta:", res);
                }
            });
    }

    useEffect(() => {
        listarGruposEtiquetasFunc();
    }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has("grupo")) {
            // El parámetro "grupo" existe
            console.log("El parámetro grupo existe:", params.get("grupo"));
            setIdGrupoSeleccionado(params.get("grupo"));
        } else {
            // El parámetro "grupo" NO existe
            console.log("El parámetro grupo NO existe");
            setIdGrupoSeleccionado(null);
        }
    }, [url]);

    return (
        <div className="min-h-screen w-full flex flex-wrap items-start justify-start gap-x-6 gap-y-4 overflow-y-auto bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-10">
            {idGrupoSeleccionado ? (
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
                <div className="flex flex-wrap items-start justify-start gap-x-6 gap-y-4">
                    {grupoTags.map((item, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => navigate(`/posts?grupo=${item.ID}`)}
                            className="bg-white rounded-xl shadow-lg p-10 text-center cursor-pointer hover:scale-105 transition-transform"
                        >
                            <h1 className={`text-3xl font-bold ${item.color} mb-2`}>{item.title}</h1>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PostsContainer;

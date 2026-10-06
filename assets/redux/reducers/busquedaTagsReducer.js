const initial_state = {
    listandoGruposEtiquetas: false,
    listandoPostsPorGrupo: false,
    listandoTags: false,
    listandoImagenesPorPost: false,
    listandoPostsPorTag: false
}

const busquedaTagsReducer = (state = initial_state, action) => {
    switch(action.type) {
        case "CLEAR_BUSQUEDA_TAGS": return {...initial_state}
        case "LISTAR_GRUPOS_ETIQUETAS": return {...state, listandoGruposEtiquetas: true}
        case "LISTAR_GRUPOS_ETIQUETAS_SUCCESS": return {...state, listandoGruposEtiquetas: false}
        case "LISTAR_GRUPOS_ETIQUETAS_FAIL": return {...state, listandoGruposEtiquetas: false}
        case "LISTAR_POSTS_POR_GRUPO": return {...state, listandoPostsPorGrupo: true}
        case "LISTAR_POSTS_POR_GRUPO_SUCCESS": return {...state, listandoPostsPorGrupo: false}
        case "LISTAR_POSTS_POR_GRUPO_FAIL": return {...state, listandoPostsPorGrupo: false}
        case "LISTAR_TAGS": return {...state, listandoTags: true}
        case "LISTAR_TAGS_SUCCESS": return {...state, listandoTags: false}
        case "LISTAR_TAGS_FAIL": return {...state, listandoTags: false}
        case "LISTAR_IMAGENES_POR_POST": return {...state, listandoImagenesPorPost: true}
        case "LISTAR_IMAGENES_POR_POST_SUCCESS": return {...state, listandoImagenesPorPost: false}
        case "LISTAR_IMAGENES_POR_POST_FAIL": return {...state, listandoImagenesPorPost: false}
        case "LISTAR_POSTS_POR_TAG": return {...state, listandoPostsPorTag: true}
        case "LISTAR_POSTS_POR_TAG_SUCCESS": return {...state, listandoPostsPorTag: false}
        case "LISTAR_POSTS_POR_TAG_FAIL": return {...state, listandoPostsPorTag: false}
    }
    return state;
}

export default busquedaTagsReducer;
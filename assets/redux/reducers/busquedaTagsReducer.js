const initial_state = {
    listandoGruposEtiquetas: false,
    listandoTags: false
}

const busquedaTagsReducer = (state = initial_state, action) => {
    switch(action.type) {
        case "CLEAR_BUSQUEDA_TAGS": return {...initial_state}
        case "LISTAR_GRUPOS_ETIQUETAS": return {...state, listandoGruposEtiquetas: true}
        case "LISTAR_GRUPOS_ETIQUETAS_SUCCESS": return {...state, listandoGruposEtiquetas: false}
        case "LISTAR_GRUPOS_ETIQUETAS_FAIL": return {...state, listandoGruposEtiquetas: false}
        case "LISTAR_TAGS": return {...state, listandoTags: true}
        case "LISTAR_TAGS_SUCCESS": return {...state, listandoTags: false}
        case "LISTAR_TAGS_FAIL": return {...state, listandoTags: false}
    }
    return state;
}

export default busquedaTagsReducer;
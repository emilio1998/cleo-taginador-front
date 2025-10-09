const initial_state = {
    listandoGruposEtiquetas: false
}

const busquedaTagsReducer = (state = initial_state, action) => {
    switch(action.type) {
        case "CLEAR_BUSQUEDA_TAGS": return {...initial_state}
        case "LISTAR_GRUPOS_ETIQUETAS": return {...state, listandoGruposEtiquetas: true}
        case "LISTAR_GRUPOS_ETIQUETAS_SUCCESS": return {...state, listandoGruposEtiquetas: false}
        case "LISTAR_GRUPOS_ETIQUETAS_FAIL": return {...state, listandoGruposEtiquetas: false}
    }
    return state;
}

export default busquedaTagsReducer;
const initialState = {
    listandoPosts: false
}

const busquedaPostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CLEAR_BUSQUEDA_TAGS": return {...initialState}
        case "LISTAR_POSTS": return {...state, listandoPosts: true}
        case "LISTAR_POSTS_SUCCESS": return {...state, listandoPosts: false}
        case "LISTAR_POSTS_FAILURE": return {...state, listandoPosts: false}
    }
    return state;
}

export default busquedaPostsReducer;
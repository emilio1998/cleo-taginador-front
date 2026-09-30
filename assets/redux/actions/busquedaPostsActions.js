import axios from 'axios';
import GLOBAL from "../../helpers/globals";

const server = GLOBAL.server;

export function listarPosts() {
    try {
        return async function (dispatch) {
            dispatch({ type: "LISTAR_POSTS" });
            const url = `${server}/busqueda-tags/listarPostsPorTag`;
            const body = {
                excluirGruposId: "1,10"
            }
            return axios.post(url, body)
                .then(response => {
                    dispatch({ type: "LISTAR_POSTS_SUCCESS", payload: response.data });
                    return response
                })
                .catch(error => {
                    dispatch({ type: "LISTAR_POSTS_FAILURE", payload: error });
                    let res = {};
                    if (!!error.response) {
                        res = error.response;
                    }
                    return res;
                });
        }
    } catch (err) {
        console.log(err);
    }
}
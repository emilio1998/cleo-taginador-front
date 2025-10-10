import axios from "axios";
import GLOBAL from "../../helpers/globals";

const server = GLOBAL.server;

export function listarGruposEtiquetas() {
    try {
        return async function (dispatch) {
            dispatch({type: "LISTAR_GRUPOS_ETIQUETAS"});
            let token = localStorage.getItem("token");
            const url = server + "/busqueda-tags/listarGruposEtiquetas";
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
            return axios.get(
                url, { headers }
            )
            .then((res) => {
                dispatch({ type: "LISTAR_GRUPOS_ETIQUETAS_SUCCESS", payload: res.data });
                return res;
            })
            .catch((error) => {
                dispatch({ type: "LISTAR_GRUPOS_ETIQUETAS_ERROR", payload: {} });
                let res = {};
                if (!!error.response) {
                    res = error.response;
                }
                return res;
            });
        }
    } catch (e) {
        console.log(e);
    }
}
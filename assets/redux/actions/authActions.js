import axios from "axios";
import GLOBAL from "../../helpers/globals";

const server = GLOBAL.server;

export function login(username, password) {
  try {
    return function (dispatch) {
      dispatch({ type: "LOGIN" });
      return axios
        .post(server + "/login/verificarLogin", {
          username,
          password
        })
        .then((res) => {
          localStorage.setItem("token", res.data.accessToken);
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          return res;
        })
        .catch((e) => {
          dispatch({ type: "LOGIN_FAIL", payload: {} });
          let res = {};
          if (!!e.response) {
            res = e.response;
          }
          return res;
        });
    };
  } catch (e) {
    console.log(e);
  }
}

export function logout() {
  try {
    return async function (dispatch) {
      let token = localStorage.getItem("token");

      dispatch({ type: "LOGOUT" });
      try {
        const res = await axios.get(
          server + "/login/cerrarSesion",
          {}
        );
        dispatch({ type: "LOGOUT_SUCCESS", payload: res.data });
        return res.data;
      } catch (e) {
        dispatch({ type: "LOGOUT_FAIL", payload: {} });
        let res = {};
        if (!!e.response) {
          res = e.response;
        }
        return res;
      }
    };
  } catch (e) {
    console.log(e);
  }
}

export const sigueSesion = async () => {
  let token = localStorage.getItem("token");
  const res = { data: null };
  try {
    const response = await axios.get(
      server + "/login/sigueSesion",
      {
        headers: {
          AccessToken: token
        }
      }
    );
    res.data = response.data;
    res.status = response.status;
  } catch (e) {
    res.data = e.response ? e.response.data : e;
    res.status = e.response ? e.response.status : 500;
  }
  return res;
}

export function notAuthorized() {
  try {
    return function (dispatch) {
      dispatch({
        type: "LOGIN_FAIL",
      });
    };
  } catch (e) {
    throw e;
  }
}
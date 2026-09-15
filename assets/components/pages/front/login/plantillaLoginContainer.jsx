import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import image1 from '../../../../images/icons/image1.svg';
import { login, notAuthorized } from "../../../../redux/actions/authActions";
import { FloatingInput } from "../../../common/FloatingInput";
import { MSG_ERROR_SERVIDOR } from "../../../../redux/variables/variablesGenerales";
import { Formik, Form } from "formik";

const PlantillaLoginContainer = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [valuesForm, setValuesForm] = useState({
        username: "",
        password: ""
    });
    const [actionsForm, setActionsForm] = useState(null);
    const [errors, setErrors] = useState({});

    const [loginError, setLoginError] = useState("");

    const formInitialValues = {
        username: "",
        password: ""
    }

    const validateErrors = (values, actions) => {
        setValuesForm(values);
        setActionsForm(actions);

        const newErrors = {};

        if (!values.username) {
            newErrors.username = "El usuario es requerido.";
        }
        if (!values.password) {
            newErrors.password = "La contraseña es requerida.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            doLoginForm(values, actions);
        } else {
            actions.setSubmitting(false);
        }
    }

    const doLoginForm = (values, actions) => {
        dispatch(login(values.username, values.password)).then((res) => {
            if (Object.keys(res).length === 0) {
                setLoginError(MSG_ERROR_SERVIDOR);
                actions.setSubmitting(false);
                return;
            } else if (!!res.status) {
                const data = res.data;
                if (data && data.accessToken) {
                    navigate("/");
                } else if (
                    res.status === 403 ||
                    res.status === 404 ||
                    res.status === 406 ||
                    res.status === 500 ||
                    res.status === 400 ||
                    res.status === 502
                ) {
                    setLoginError(res.data);
                    if (res.status === 406) {
                        dispatch(notAuthorized());
                    } else {
                        actions.setSubmitting(false);
                        setLoginError(res.data);
                    }
                } else {
                    setLoginError(MSG_ERROR_SERVIDOR);
                }
                actions.setSubmitting(false);
            }
        })
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br p-6">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-slate-200 p-8">
                <div className="flex flex-col items-center mb-8">
                    <img src={image1} alt="CLEO-TAGINADOR" className="h-12 w-auto mb-3" />
                    <h1 className="text-lg font-semibold text-slate-700">Iniciar sesión</h1>
                </div>

                <div className="flex flex-col gap-4">
                    <Formik
                        initialValues={formInitialValues}
                        onSubmit={(values, actions) => validateErrors(values, actions)}
                    >
                        {({ values, handleChange, handleSubmit, isSubmitting }) => (
                            <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                <FloatingInput
                                    name="username"
                                    type="text"
                                    value={values.username}
                                    onChange={handleChange}
                                    placeholder="Usuario"
                                />
                                {errors.username ? (
                                    <div>
                                        <p className="text-sm font-normal text-red-700 mt-1">
                                            {errors.username}
                                        </p>
                                    </div>
                                ) : null}
                                <FloatingInput
                                    name="password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Contraseña"
                                />
                                {errors.password ? (
                                    <div>
                                        <p className="text-sm font-normal text-red-700 mt-1">
                                            {errors.password}
                                        </p>
                                    </div>
                                ) : null}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-2 w-full rounded-md bg-slate-800 py-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                >
                                    {isSubmitting ? "Ingresando..." : "Ingresar"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                    {loginError && (
                        <div className="text-center">
                            <p className="text-sm font-normal text-red-700 mt-4">
                                {loginError}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PlantillaLoginContainer;

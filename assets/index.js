import React from "react";
import ReactDOM, {createRoot} from "react-dom/client";
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import './css/style.css';
import App from "./App";
import configureStore from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
const {persistor, store} = configureStore();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap.min.js';
import './style/sass/all.scss';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store.jsx';
import { PersistGate } from 'redux-persist/integration/react';
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_API_URL;
import { register } from 'swiper/element/bundle';
register(); // 初始化 swiper 套件

const App = lazy(() => import('./App.jsx'));

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </Suspense>
    // </React.StrictMode>
);

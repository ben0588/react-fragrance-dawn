import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap.min.js';
import './style/sass/all.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store.jsx';
import { PersistGate } from 'redux-persist/integration/react';
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_API_URL;
import { register } from 'swiper/element/bundle';
import FirstLoading from './components/FirstLoading';
register(); // 初始化 swiper 套件

const App = lazy(() => import('./App.jsx'));

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <Suspense fallback={<FirstLoading />}>
        <HashRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </HashRouter>
    </Suspense>
    // </React.StrictMode>
);

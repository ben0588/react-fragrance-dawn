import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/js/bootstrap.min.js';
import './style/sass/all.scss';
import axios from 'axios';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store.jsx';
import { PersistGate } from 'redux-persist/integration/react';
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_API_URL;
import { register } from 'swiper/element/bundle';

register(); // 初始化 swiper 套件

ReactDOM.createRoot(document.getElementById('root')).render(
    <HashRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </HashRouter>,
);

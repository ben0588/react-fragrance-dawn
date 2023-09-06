import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/react-fragrance-dawn/' : '/',
    plugins: [react()],
    css: {
        postcss: {
            plugins: [
                autoprefixer({
                    overrideBrowserslist: ['last 2 versions'],
                    grid: true,
                    flexbox: true,
                    remove: false,
                    cascade: true,
                }),
            ],
        },
    },
});

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'pages/index.html'),
                tours: resolve(__dirname, 'pages/tours.html'),
                safety: resolve(__dirname, 'pages/safety.html'),
                localInfo: resolve(__dirname, 'pages/local-info.html'),
                map: resolve(__dirname, 'pages/map.html'),
                activities: resolve(__dirname, 'pages/activities.html'),
                blog: resolve(__dirname, 'pages/blog.html'),
                contact: resolve(__dirname, 'pages/contact.html'),
                chocotour: resolve(__dirname, 'pages/chocotour.html'),
                coffeeFarm: resolve(__dirname, 'pages/coffee-farm.html'),
                coffeeTasting: resolve(__dirname, 'pages/coffee-tasting.html'),
                cristoRey: resolve(__dirname, 'pages/cristo-rey.html'),
                hummingbirds: resolve(__dirname, 'pages/hummingbirds.html'),
                marketTour: resolve(__dirname, 'pages/market-tour.html'),
                salsaTour: resolve(__dirname, 'pages/salsa-tour.html'),
                streetFood: resolve(__dirname, 'pages/street-food.html'),
                waterfalls: resolve(__dirname, 'pages/waterfalls.html'),
                whaleWatching: resolve(__dirname, 'pages/whale-watching.html')
            }
        }
    }
});

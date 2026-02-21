import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                tours: resolve(__dirname, 'tours.html'),
                safety: resolve(__dirname, 'safety.html'),
                localInfo: resolve(__dirname, 'local-info.html'),
                map: resolve(__dirname, 'map.html'),
                activities: resolve(__dirname, 'activities.html'),
                blog: resolve(__dirname, 'blog.html'),
                contact: resolve(__dirname, 'contact.html'),
                chocotour: resolve(__dirname, 'chocotour.html'),
                coffeeFarm: resolve(__dirname, 'coffee-farm.html'),
                coffeeTasting: resolve(__dirname, 'coffee-tasting.html'),
                cristoRey: resolve(__dirname, 'cristo-rey.html'),
                hummingbirds: resolve(__dirname, 'hummingbirds.html'),
                marketTour: resolve(__dirname, 'market-tour.html'),
                salsaTour: resolve(__dirname, 'salsa-tour.html'),
                streetFood: resolve(__dirname, 'street-food.html'),
                waterfalls: resolve(__dirname, 'waterfalls.html'),
                whaleWatching: resolve(__dirname, 'whale-watching.html')
            }
        }
    }
});

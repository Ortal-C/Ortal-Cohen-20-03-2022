import { KEY } from './weather.service';
const axios = require('axios');
const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY

const axiosClient = axios.create({
    baseURL: `https://api.unsplash.com`,
})

export async function getCityBg(cityKey, cityName) {
    let db = JSON.parse(localStorage.getItem(KEY)) || {};
    if (db && db[cityKey])
        return db[cityKey];
    else {
        const query = cityName.split(' ').join('%20');
        try {
            const res = await axiosClient.get(`/search/photos?query=${query}&order_by=relevant&client_id=${API_KEY}`);
            const bg = res.data.results.find(img => img.description?.includes(cityName) || img.alt_description?.includes(cityName));
            return (
                {
                    full: bg.urls.full || null,
                    thumb: bg.urls.thumb || null,
                }

            )
        } catch (err) {
            console.log('Error in getCityBg service:', err);
        }
    }
}

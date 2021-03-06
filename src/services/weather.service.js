
import { convertCToF, convertFToC } from './util.service.js'
const axios = require('axios')
export const KEY = 'weatherDB'
const API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY

const axiosClient = axios.create({
    baseURL: `https://dataservice.accuweather.com`,
})

async function searchCities(searchBy) {
    try {
        const { data } = await axiosClient.get(`/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchBy}`)
        return data.map(city => ({
            key: city.Key,
            name: city.LocalizedName,
            country: city.Country.LocalizedName,
        }))
    } catch (err) {
        console.log('Error in searchCities service:', err)
        throw err;
    }
}

async function getCurrCityByGeolocation(lat, lon) {
    try {
        const { data: city } = await axiosClient.get(`/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`)
        return {
            key: city.Key,
            name: city.LocalizedName,
            country: city.Country.LocalizedName,
        }
    } catch (err) {
        console.log('Error in getCurrCityByGeolocation service:', err)
        throw err;
    }
}

async function loadForecast(cityData) {
    const { key } = cityData
    let db = JSON.parse(localStorage.getItem(KEY)) || {}
    if (db && db[key]) {
        return db[key]
    }
    try {
        const { data } = await axiosClient.get(`/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}`)
        console.log('Did an Accuweather API req');
        db[key] = {
            ...cityData,
            forecasts: data.DailyForecasts.map(forecast => {
                const { Minimum, Maximum } = forecast.Temperature
                return {
                    ...forecast,
                    Temperature: {
                        f: {
                            maxVal: Maximum.Unit === 'C' ? convertCToF(Maximum.Value) : Maximum.Value,
                            minVal: Minimum.Unit === 'C' ? convertCToF(Minimum.Value) : Minimum.Value
                        },
                        c: {
                            maxVal: Maximum.Unit === 'F' ? convertFToC(Maximum.Value) : Maximum.Value,
                            minVal: Minimum.Unit === 'F' ? convertFToC(Minimum.Value) : Minimum.Value
                        }
                    }
                }
            }),
            headline: {
                ...(data.Headline),
                weatherType: {
                    day: data.DailyForecasts[0].Day.IconPhrase,
                    night: data.DailyForecasts[0].Night.IconPhrase,
                }
            }
        }
        _save(KEY, db)
        return db[key]
    } catch (err) {
        console.log('Error in loadForecast service:', err)
    }
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

export const weatherService = {
    loadForecast,
    searchCities,
    getCurrCityByGeolocation,
}
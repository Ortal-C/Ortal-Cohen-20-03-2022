import { weatherService } from '../../services/weather.service.js';
import { SET_AUTOCOMPLETE_CITIES, SET_CURR_CITY, SET_CURR_CITY_FORECAST, SET_LOADING, REMOVE_FAVORITE_CITY_FROM_FAVORITES, ADD_CITY_TO_FAVORITES } from "./weather.types";

// Action Creator
export function loadForecast(cityData) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: SET_CURR_CITY, payload: cityData })
            const currCityForecast = await weatherService.loadForecast(cityData)
            dispatch({ type: SET_CURR_CITY_FORECAST, payload: currCityForecast })
        } catch (err) {
            console.log('Error in loadForecast action', err)
            throw err
        }
    }
}

export function searchCities(searchBy) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: SET_LOADING, payload: true })
            const cities = await weatherService.searchCities(searchBy);
            dispatch({ type: SET_AUTOCOMPLETE_CITIES, payload: cities })
            dispatch({ type: SET_LOADING, payload: false })
        } catch (err) {
            console.log('Error in searchCities action', err)
            throw err
        }
    }
}

export function getCurrCityByGeolocation(lat, lon) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: SET_LOADING, payload: true })
            const currCity = await weatherService.getCurrCityByGeolocation(lat, lon);
            dispatch({ type: SET_CURR_CITY, payload: currCity })
            dispatch({ type: SET_LOADING, payload: false })
        } catch (err) {
            console.log('Error in searchCities action', err)
            throw err

        }
    }
}

export function addCityToFavorites(cityKey, cityForecast = null) {
    return async (dispatch, getState) => {
        try {
            if (!cityForecast) {
                cityForecast = await weatherService.loadForecast({ key: cityKey, })
            }
            dispatch({ type: ADD_CITY_TO_FAVORITES, payload: { key: cityKey, cityForecast } })
        } catch (err) {
            console.log('Error in addCityToFavorites action', err)
            throw err

        }
    }
}

export function removeCityFromFavorites(cityKey) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: REMOVE_FAVORITE_CITY_FROM_FAVORITES, payload: cityKey })
        } catch (err) {
            console.log('Error in removeCityFromFavorites action', err)
            throw err

        }
    }
}

import React from 'react';
import { weatherService } from '../../services/weather.service.js';
import { SET_CURR_CITY_FORECAST, SET_LOADING } from '../reducers/weather.reducer.js';

// Action Creator
export function loadForecast() {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: SET_LOADING, payload: true })
            const currCityForecast = await weatherService.query('Tel Aviv')
            dispatch({ type: SET_CURR_CITY_FORECAST, payload: currCityForecast })
            dispatch({ type: SET_LOADING, payload: false })
        } catch (err) {
            console.log('Error in loadForecast action', err)
        }
    }
}

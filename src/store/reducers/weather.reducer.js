import {
    SET_LOADING,
    SET_CURR_CITY,
    SET_CURR_CITY_FORECAST,
    SET_CURR_DAY_TIME,
    SET_AUTOCOMPLETE_CITIES,
    ADD_CITY_TO_FAVORITES,
    REMOVE_FAVORITE_CITY_FROM_FAVORITES,
    SET_DARK_MODE,
    SET_TEMPERATURE_UNIT
} from '../actions/weather.types'

const temperatureUnit = {
    F: 'f',
    C: 'c',
}

const INITIAL_STATE = {
    isLoading: false,
    isDarkMode: false,
    temperatureUnit: temperatureUnit.F,
    currCity: {
        key: '215854',
        name: 'Tel Aviv',
        country: 'Israel',
    },
    currCityForecast: {},
    favorites: {},
    autocompleteCities: [],
}

export function weatherReducer(state = INITIAL_STATE, { type, payload }) {

    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: payload
            };
        case SET_CURR_CITY:
            return {
                ...state,
                currCity: payload
            };
        case SET_CURR_CITY_FORECAST:
            return {
                ...state,
                currCityForecast: payload
            };
        case SET_CURR_DAY_TIME: {
            const hours = new Date().getHours()
            return {
                ...state,
                dayTime: hours > 6 && hours < 20 ? 'day' : 'night'
            }
        }

        case SET_AUTOCOMPLETE_CITIES:
            return {
                ...state,
                autocompleteCities: payload
            };
        case ADD_CITY_TO_FAVORITES: {
            const { key, cityForecast } = payload
            return {
                ...state,
                favorites: {
                    ...state.favorites,
                    [key]: cityForecast
                }
            };
        }
        case REMOVE_FAVORITE_CITY_FROM_FAVORITES: {
            const newState = JSON.parse(JSON.stringify(state));
            delete newState.favorites[payload]
            return newState;
        }
        case SET_DARK_MODE: {
            return {
                ...state,
                isDarkMode: payload
            }
        }
        case SET_TEMPERATURE_UNIT: {
            return {
                ...state,
                temperatureUnit: payload
            }
        }
        default:
            return state;
    }
}
const INITIAL_STATE = {
    isLoading: false,
    currCityForecast: {},
}


export const SET_LOADING = 'SET_LOADING'
export const SET_CURR_CITY_FORECAST = 'SET_CURR_CITY_FORECAST'
export const SET_AUTOCOMPLETE = 'SET_AUTOCOMPLETE'
export const SET_TRACK = 'SET_TRACK'

export function weatherReducer(state = INITIAL_STATE, { type, payload }) {

    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: payload
            };
        case SET_CURR_CITY_FORECAST:
            return {
                ...state,
                currCityForecast: payload
            };

        case SET_AUTOCOMPLETE:
            return {
                ...state,
                autocomplete: payload
            };

        // case 'ADD_ROBOT':
        //     return {
        //         ...state,
        //         robots: [...state.robots, action.robot]
        //     }

        // case 'REMOVE_ROBOT':
        //     return {
        //         ...state,
        //         robots: state.robots.filter(robot => robot._id !== action.robotId)
        //     }

        // case 'UPDATE_ROBOT':
        //     return {
        //         ...state,
        //         robots: state.robots.map(robot => robot._id === action.robot._id ? action.robot : robot)
        //     }
        // case 'SET_FILTER_BY':
        //     return {
        //         ...state,
        //         filterBy: { ...action.filterBy }
        //     }

        default:
            return state;
    }

}
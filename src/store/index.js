import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { weatherReducer } from './reducers/weather.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    weather: weatherReducer,
})

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)
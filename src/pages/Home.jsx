import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip, IconButton } from '@mui/material'
import { FavoriteOutlined, FavoriteBorderOutlined, MyLocation } from '@mui/icons-material'
import { pink } from '@mui/material/colors'
import './home.scss'
import {
	loadForecast,
	searchCities,
	getCurrCityByGeolocation,
	removeCityFromFavorites,
	addCityToFavorites,
} from '../store/actions/weather.actions.js'
import { SET_CURR_CITY, SET_CURR_DAY_TIME } from '../store/actions/weather.types'
import {
	temperatureStr,
	capitalizeFirstLetter,
	parseWeatherDescToCondition,
} from '../services/util.service'
import Search from '../components/search/Search'
import WeatherIcon from '../components/weather-icon/WeatherIcon'
import WeatherList from '../components/weather-list/WeatherList'

export default function Home() {
	const dispatch = useDispatch()
	const autocompleteCities = useSelector((state) => state.weather.autocompleteCities)
	const currCity = useSelector((state) => state.weather.currCity)
	const currCityForecast = useSelector((state) => state.weather.currCityForecast)
	const isFavorite = useSelector((state) => state.weather.favorites[currCity.key] !== undefined)
	const temperatureUnit = useSelector((state) => state.weather.temperatureUnit)
	const currDayTime = useSelector((state) => state.weather.dayTime)
	const weatherType = currCityForecast.headline?.weatherType
	const todayForecast = currCityForecast.forecasts ? currCityForecast.forecasts[0] : {}
	const headerTemperatureStr = currCityForecast.forecasts
		? `${temperatureStr(todayForecast.Temperature, temperatureUnit)
				.slice(0, 2)
				.replace('-', '')}°`
		: ''

	useEffect(() => {
		if (currCity) {
			dispatch(loadForecast(currCity))
			dispatch({ type: SET_CURR_DAY_TIME })
		}
	}, [dispatch, currCity])

	useEffect(() => {
		if (weatherType && weatherType[currDayTime]) {
			const weatherBg = `${parseWeatherDescToCondition(weatherType[currDayTime])}.jpg`
			document.body.style.backgroundImage = `url(${require(`../assets/bg/${currDayTime}/${weatherBg}`)})`
		}
	}, [weatherType, currDayTime])

	const handleSelectCity = useCallback(
		(city) => {
			if (city) {
				dispatch({ type: SET_CURR_CITY, payload: city })
			}
		},
		[dispatch]
	)

	const handleSearchStringChange = useCallback(
		(newSearchString) => {
			if (newSearchString && newSearchString.match(/^[a-zA-Z]+$/)) {
				dispatch(searchCities(newSearchString))
			} else {
				//error handling
			}
		},
		[dispatch]
	)

	const handleToggleFavorites = () => {
		isFavorite
			? dispatch(removeCityFromFavorites(currCity.key))
			: dispatch(addCityToFavorites(currCity.key))
	}

	const handleShowCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords
				dispatch(getCurrCityByGeolocation(latitude, longitude))
			})
		}
	}
	return (
		<div className='home'>
			<div className='home__search-box'>
				<Search
					items={autocompleteCities}
					currCity={currCity}
					handleSelectCity={handleSelectCity}
					handleSearchStringChange={handleSearchStringChange}
				/>
				<Tooltip
					title='Show Current Location'
					onClick={handleShowCurrentLocation}
					style={{ backgroundColor: 'white' }}
				>
					<IconButton>
						<MyLocation />
					</IconButton>
				</Tooltip>
			</div>
			<div className='home__main-content'>
				{currCity && currCityForecast && currCityForecast.forecasts && (
					<div className='home__main-content__header'>
						<div className='home__main-content__header__title'>
							<div>
								<h1>{`${currCity.name}, ${currCity.country}`}</h1>
								<h3>{Date().slice(0, 16)}</h3>
							</div>

							<Tooltip
								onClick={handleToggleFavorites}
								title={`${
									!isFavorite
										? `Click to add ${currCity.name} to favorites.`
										: `Click to remove ${currCity.name} from favorites.`
								}`}
							>
								<IconButton>
									{!isFavorite ? (
										<FavoriteBorderOutlined
											sx={{
												fontSize: '3.5rem',
											}}
										/>
									) : (
										<FavoriteOutlined
											sx={{
												fontSize: '3.5rem',
												color: pink[500],
											}}
										/>
									)}
								</IconButton>
							</Tooltip>
						</div>
						<div className='home__main-content__header__desc'>
							<WeatherIcon
								desc={
									currCityForecast.headline?.weatherType[
										currDayTime
									]
								}
							/>
							<div>
								<h1>{headerTemperatureStr}</h1>
								<p>
									{capitalizeFirstLetter(
										currCityForecast.headline.Category
									)}
								</p>
							</div>
							<p className='home__main-content__header__desc__text'>
								{currCityForecast.headline?.Text}
							</p>
						</div>
					</div>
				)}
				{currCityForecast && currCityForecast.forecasts && (
					<WeatherList forecasts={currCityForecast.forecasts} />
				)}
			</div>
		</div>
	)
}

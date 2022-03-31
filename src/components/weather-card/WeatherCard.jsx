import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './weather-card.scss'
import WeatherIcon from '../weather-icon/WeatherIcon'
import { getDayByDate, temperatureStr } from '../../services/util.service.js'
import { Delete } from '@mui/icons-material'
import { Tooltip, IconButton } from '@mui/material'
import { removeCityFromFavorites } from '../../store/actions/weather.actions'
import { SET_CURR_CITY } from '../../store/actions/weather.types.js'

export default function WeatherCard({ day = null, favorite = null, isDarkMode }) {
	let navigate = useNavigate()
	const dispatch = useDispatch()
	const currDayTime = useSelector((state) => state.weather.dayTime)
	const className = day && !favorite ? 'weather-card' : 'weather-card__favorite'
	const temperatureUnit = useSelector((state) => state.weather.temperatureUnit)
	const handleShowFavorite = useCallback(() => {
		if (favorite) {
			const { key, name, country } = favorite
			dispatch({ type: SET_CURR_CITY, payload: { key, name, country } })
			navigate('/')
		}
	}, [dispatch, navigate, favorite])

	const handleRemove = (e) => {
		e.stopPropagation()
		dispatch(removeCityFromFavorites(favorite.key))
	}

	return (
		<div
			className={`${className} ${isDarkMode ? ' dark' : ''}`}
			onClick={handleShowFavorite}
		>
			{day && (
				<div className='weather-card__info'>
					<h2>{getDayByDate(day.Date)}</h2>
					<h3>{new Date(day.Date).toLocaleDateString('he-il')}</h3>
					<WeatherIcon desc={day.Day.IconPhrase} isDarkMode={isDarkMode} />
					<p>{temperatureStr(day.Temperature, temperatureUnit)}</p>
				</div>
			)}
			{favorite && (
				<Tooltip title='Show Favorite Item.'>
					<div className='weather-card__info'>
						<h2>{favorite.name}</h2>
						<WeatherIcon
							desc={favorite.headline.weatherType[currDayTime]}
							isDarkMode={isDarkMode}
						/>
						<h3>
							{temperatureStr(
								favorite.forecasts[0].Temperature,
								temperatureUnit
							)}
						</h3>

						<Tooltip onClick={handleRemove} title='Delete From Favorites.'>
							<IconButton>
								<Delete
									sx={{
										color: `${isDarkMode ? '#cbe1f1' : ''}`,
									}}
								/>
							</IconButton>
						</Tooltip>
					</div>
				</Tooltip>
			)}
		</div>
	)
}

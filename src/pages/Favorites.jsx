import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import WeatherCard from '../components/weather-card/WeatherCard'
import './favorites.scss'

export default function Favorites() {
	const isDarkMode = useSelector((state) => state.weather.isDarkMode)
	const favorites = useSelector((state) => state.weather.favorites) || {}
	useEffect(() => {
		document.body.style.backgroundColor = isDarkMode ? '#222222' : '#ffffff'
		document.body.style.backgroundImage = 'none'
	}, [isDarkMode])

	return (
		<div className='favorites'>
			{favorites && (
				<div className='favorites-container'>
					{Object.values(favorites)?.map((favorite, idx) => (
						<WeatherCard key={favorite.key} favorite={favorite} />
					))}
				</div>
			)}
		</div>
	)
}

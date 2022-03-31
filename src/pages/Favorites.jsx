import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import WeatherCard from '../components/weather-card/WeatherCard'
import './favorites.scss'

export default function Favorites() {
	const isDarkMode = useSelector((state) => state.weather.isDarkMode)
	const favorites = useSelector((state) => state.weather.favorites) || {}
	useEffect(() => {
		document.body.style.backgroundColor = isDarkMode ? '#121212' : '#ffffff'
		document.body.style.backgroundImage = 'none'
	}, [isDarkMode])

	return (
		<div className='favorites'>
			{favorites && (
				<div className='favorites-container'>
					{Object.values(favorites).length === 0 &&
						'There are no favorites yet.'}
					{Object.values(favorites)?.map((favorite, idx) => (
						<WeatherCard
							key={favorite.key}
							favorite={favorite}
							isDarkMode={isDarkMode}
						/>
					))}
				</div>
			)}
		</div>
	)
}

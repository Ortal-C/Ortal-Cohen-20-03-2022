import React from 'react'
import WeatherCard from '../weather-card/WeatherCard'
import './weather-list.scss'
export default function WeatherList({ forecasts = [], isDarkMode }) {
	return (
		<div className={`weather-list ${isDarkMode ? 'dark' : ''}`}>
			{forecasts?.map((day, idx) => (
				<WeatherCard key={idx} idx={idx} day={day} isDarkMode={isDarkMode} />
			))}
		</div>
	)
}

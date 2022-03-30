import React from 'react'
import WeatherCard from '../weather-card/WeatherCard'
import './weather-list.scss'
export default function WeatherList({ forecasts = [] }) {
	return (
		<div className='weather-list'>
			{forecasts?.map((day, idx) => (
				<WeatherCard key={idx} idx={idx} day={day} />
			))}
		</div>
	)
}

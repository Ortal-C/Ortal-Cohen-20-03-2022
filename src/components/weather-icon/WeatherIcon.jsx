import React, { useMemo } from 'react'
import { parseWeatherDescToCondition } from '../../services/util.service.js'
import cloudy from '../../assets/weather-icons/cloudy.svg'
import fog from '../../assets/weather-icons/foggy.svg'
import haze from '../../assets/weather-icons/hazy.svg'
import moon from '../../assets/weather-icons/moon.svg'
import rainy from '../../assets/weather-icons/rainy.svg'
import snowy from '../../assets/weather-icons/snowy.svg'
import stormy from '../../assets/weather-icons/stormy.svg'
import sunny from '../../assets/weather-icons/sunny.svg'

const iconMap = {
	cloudy,
	fog,
	haze,
	moon,
	rainy,
	snowy,
	stormy,
	sunny,
}

export default function WeatherIcon({ desc }) {
	const weatherCondition = useMemo(() => {
		return parseWeatherDescToCondition(desc)
	}, [desc])
	return <img className='weather-icon' src={iconMap[weatherCondition]} alt='weather_icon' />
}

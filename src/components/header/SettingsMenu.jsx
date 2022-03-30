import React from 'react'
import { useDispatch } from 'react-redux'
import { SET_DARK_MODE, SET_TEMPERATURE_UNIT } from '../../store/actions/weather.types.js'
import './header.scss'

export default function SettingsMenu({ isShow }) {
	const dispatch = useDispatch()
	const setDarkMode = (e) => {
		dispatch({ type: SET_DARK_MODE, payload: e.target.value === 'dark' })
	}
	const setTemperatureUnit = (e) => {
		dispatch({ type: SET_TEMPERATURE_UNIT, payload: e.target.value })
	}
	return (
		<div className='settings-menu'>
			{isShow && (
				<>
					<h4>Theme</h4>
					<button value={'light'} onClick={setDarkMode}>
						Light
					</button>
					<button value={'dark'} onClick={setDarkMode}>
						Dark
					</button>
					<h4>Unit</h4>
					<button value={'f'} onClick={setTemperatureUnit}>
						Fahrenheit
					</button>
					<button value={'c'} onClick={setTemperatureUnit}>
						Celsius
					</button>
				</>
			)}
		</div>
	)
}

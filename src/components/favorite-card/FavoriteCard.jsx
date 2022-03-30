import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	loadForecast,
	removeCityFromFavorites,
} from '../../store/actions/weather.actions'
import { SET_CURR_CITY } from '../../store/actions/weather.types.js'
import { Delete, ArrowForward } from '@mui/icons-material'
import { Tooltip, IconButton } from '@mui/material'

export default function FavoriteCard({ favorite }) {
	let navigate = useNavigate()
	const { key, name, country } = favorite
	const dispatch = useDispatch()
	const currCity = useSelector((state) => state.weather.currCity)

	useEffect(() => {
		if (currCity) {
			dispatch(loadForecast(currCity))
		}
	}, [dispatch, currCity])

	const handleShowFavorite = useCallback(() => {
		dispatch({ type: SET_CURR_CITY, payload: { key, name, country } })
		navigate('/')
	}, [dispatch, key, name, country, navigate])

	const handleRemove = () => dispatch(removeCityFromFavorites(key))

	return (
		<div>
			{name} , {country}
			<Tooltip
				onClick={handleShowFavorite}
				title='Show Favorite Item.'
			>
				<IconButton>
					<ArrowForward />
				</IconButton>
			</Tooltip>
			<Tooltip
				onClick={handleRemove}
				title='Delete From Favorites.'
			>
				<IconButton>
					<Delete />
				</IconButton>
			</Tooltip>
		</div>
	)
}

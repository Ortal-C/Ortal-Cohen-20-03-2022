import React from 'react'
import { Route, Routes as Switch } from 'react-router-dom'
import { Home, Favorites } from './pages'

export default function Routes() {
	return (
		<Switch>
			<Route path='/' element={<Home />} />
			<Route path='/favorites' element={<Favorites />} />
		</Switch>
	)
}

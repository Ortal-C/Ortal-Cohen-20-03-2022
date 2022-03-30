import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo'
import SettingsMenu from './SettingsMenu'
import './header.scss'

const headerNavLinks = [
	{
		display: 'Home',
		path: '/',
	},
	{
		display: 'Favorites',
		path: '/favorites',
	},
]

export default function Header() {
	const { pathname } = useLocation()
	const [isSettingsMenuShown, setIsSettingsMenuShown] = useState(false)
	const toggleSettingsMenuDisplay = () => {
		setIsSettingsMenuShown((prevState) => !prevState)
	}
	return (
		<div className='header'>
			<Logo />
			<div className='header__nav'>
				{headerNavLinks.map((link, idx) => (
					<Link
						key={idx}
						className={pathname === link.path ? 'active' : ''}
						to={link.path}
						title={link.display}
					>
						{link.display}
					</Link>
				))}
				<div title='Settings' onClick={toggleSettingsMenuDisplay}>
					Settings
					{isSettingsMenuShown && <SettingsMenu isShow={isSettingsMenuShown} />}
				</div>
			</div>
		</div>
	)
}

import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as LogoSvg } from './logo.svg'

export default function Logo({ size = 32 }) {
	return (
		<Link
			to='/'
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '20px',
			}}
		>
			<LogoSvg />
			<span style={{ fontSize: '2.5rem', fontWeight: 600 }}>Weather</span>
		</Link>
	)
}

import React from 'react'
import ReactSelect from 'react-select'

export default function Search({ items, currCity, handleSelectCity, handleSearchStringChange }) {
	return (
		<div style={{ flexGrow: 1, marginInlineEnd: '5px' }}>
			<ReactSelect
				value={currCity}
				getOptionValue={(option) => option.key}
				onChange={handleSelectCity}
				placeholder='Search City'
				options={items}
				getOptionLabel={(option) => `${option.name} (${option.country})`}
				onInputChange={handleSearchStringChange}
			/>
		</div>
	)
}

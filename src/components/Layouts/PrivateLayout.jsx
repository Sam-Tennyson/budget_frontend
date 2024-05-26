import React from 'react'
import Header from './Header'
import "./style.scss"

const PrivateLayout = ({ children }) => {
	return (
		<>
			<Header />
			<div className="container private-screen">
				{children}
			</div>
		</>
	)
}

export default PrivateLayout
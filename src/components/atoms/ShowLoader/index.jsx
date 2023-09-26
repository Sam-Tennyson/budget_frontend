import React from 'react'
import { Spinner } from 'react-bootstrap'

const ShowLoader = () => {
	return (
		<Spinner animation="border" role="status" size='sm' className='col-md-6 mx-auto' >
			<span className="visually-hidden">Loading...</span>
		</Spinner>
	)
}

export default ShowLoader
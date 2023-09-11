// libs
import { ErrorMessage, useField } from 'formik'
import React from 'react'

// style
import "./style.scss";

const TextField = (props) => {
	const [field] = useField(props)
	return (
		<>
			<input
				className={"form-control border-radius-form"}
				{...field}
				{...props}
				autoComplete="off"
			/>
			<ErrorMessage name={field.name} component={"div"} className='field-required-error' />
		</>
	)
}

export default TextField
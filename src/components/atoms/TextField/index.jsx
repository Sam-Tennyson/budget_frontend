// libs
import { ErrorMessage, useField } from 'formik'
import React from 'react'

// style
import "./style.scss";

const TextField = (props) => {
	const [field] = useField(props)
	const {isFormarray=false,} = props;
	return (
		<>
			<input
				className={"form-control border-radius-form"}
				{...field}
				{...props}
				autoComplete="off"
			/>
			{!isFormarray ? <ErrorMessage name={field.name} component={"div"} className='field-required-error' />: null}
		</>
	)
}

export default TextField
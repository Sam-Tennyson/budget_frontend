// libs
import React, { useRef, useState } from 'react'
import * as Yup from "yup"
import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// components
import TextField from '../../components/atoms/TextField'
import CommonImage from './components/CommonImage'

// constants
import { CONSTANTS } from '../../shared/constants'
import { ROUTE_CONSTANTS } from '../../shared/routes'
import { IMAGES } from '../../shared/images'
import { REGEX } from '../../shared/utils'
import Snackbar from '../../shared/Snackbar'

// services
import { setAuthData } from '../../reducer/AuthSlice'
import { useRegisterMutation } from '../../services/AuthServices'

// styles
import "./style.scss"

const validationSchema = Yup.object({
	password: Yup.string().trim().required(CONSTANTS.ERROR_MESSAGE.FIELD_REQUIRED),
	name: Yup.string().trim().required(CONSTANTS.ERROR_MESSAGE.FIELD_REQUIRED),
	phone: Yup.string().trim()
		.required(CONSTANTS.ERROR_MESSAGE.FIELD_REQUIRED)
		.matches(REGEX.IS_PHONE_NUMBER, "Invalid phone number"),
	email: Yup.string()
		.trim()
		.required(CONSTANTS.ERROR_MESSAGE.FIELD_REQUIRED)
		.email(CONSTANTS.ERROR_MESSAGE.VALID_EMAIL),
})

const initialValues = {
	email: CONSTANTS.EMPTY_STRING,
	password: CONSTANTS.EMPTY_STRING,
	name: CONSTANTS.EMPTY_STRING,
	phone: CONSTANTS.EMPTY_STRING,
}

const Register = () => {
	const formikRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [register] = useRegisterMutation();

	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (values) => {
		console.log(values);
		try {
			const body_data = {
				name: values.name,
				email: values.email,
				password: values.password,
				phone: values.phone
			};
			const payload = await register({ body_data }).unwrap();
			formikRef.current.resetForm()
			dispatch(setAuthData(payload))
			Snackbar.success(payload?.message);
		} catch (error) {
			Snackbar.error(error?.data?.message || CONSTANTS.ERROR_MESSAGE.SOMETHING_WENT_WRONG);
		}
	}


	return (
		<div className="container">
			<div className="row my-4">
				<div className="col-12 col-md-4">
					<CommonImage />
				</div>
				<div className="col-12 col-md-8 mx-auto d-flex align-items-center justify-content-center">
					<div className="login-form col-12 col-md-8">

						<h2 className='text-center text-decoration-underline'>{CONSTANTS.LABELS.REGISTER}</h2>
						<Formik
							innerRef={(e) => formikRef.current = e}
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							{({ values, errors }) => (
								<Form >

									<div className="field-class position-relative col-md-12 mx-auto mb-3">
										<i className='bx bxs-user' ></i>
										<TextField
											name={"name"}
											placeholder={CONSTANTS.PLACEHOLDER.NAME}
										/>
									</div>

									<div className="field-class position-relative col-md-12 mx-auto mb-3">
										<i class='bx bxl-gmail'></i>
										<TextField
											name={"email"}
											placeholder={CONSTANTS.PLACEHOLDER.EMAIL}
										/>
									</div>

									<div className="field-class position-relative col-md-12 mx-auto mb-3">
										<i className='bx bx-mobile' ></i>
										<TextField
											name={"phone"}
											placeholder={CONSTANTS.PLACEHOLDER.PHONE}
										/>
									</div>

									<div className="field-class position-relative col-md-12 mx-auto mb-3">
										<i className='bx bxs-lock'></i>
										<TextField
											name={"password"}
											type={!showPassword ? "password" : "text"}
											placeholder={CONSTANTS.PLACEHOLDER.PASSWORD}
										/>
										<span className='password-class'>
											{
												!showPassword ? (
													<img src={IMAGES.eyeOff} alt="eye-off"
														onClick={() => setShowPassword((prev) => !prev)}
													/>
												) : (
													<img src={IMAGES.eyeOn} alt="eye-on"
														onClick={() => setShowPassword((prev) => !prev)}
													/>
												)
											}
										</span>
									</div>

									<p className="my-cursor-pointer text-end set-primary-color text-bold"
										onClick={() => navigate(ROUTE_CONSTANTS.LOGIN)}
									>If registered, Please login!</p>
									<button
										type='submit'
										className='budget-button col-md-6 mx-auto mb-2'
									>{CONSTANTS.LABELS.REGISTER}</button>
								</Form>
							)}
						</Formik>

					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
// libs
import React, { useState } from 'react'
import * as Yup from "yup"
import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// components
import CommonImage from './components/CommonImage'
import TextField from '../../components/atoms/TextField'

// constants
import { CONSTANTS } from '../../shared/constants'
import { ROUTE_CONSTANTS } from '../../shared/routes'
import { IMAGES } from '../../shared/images'
import Snackbar from '../../shared/snackbar'

// services
import { useLoginMutation } from '../../services/AuthServices'
import { setAuthData } from '../../reducer/AuthSlice'

// styles
import "./style.scss"
import ShowLoader from '../../components/atoms/ShowLoader'

const validationSchema = Yup.object({
	email: Yup.string()
		.trim()
		.required(CONSTANTS.ERROR_MESSAGE.FIELD_REQUIRED)
		.email(CONSTANTS.ERROR_MESSAGE.VALID_EMAIL),
	password: Yup.string().trim().required(CONSTANTS.ERROR_MESSAGE.FIELD_REQUIRED),
});

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, {isLoading}] = useLoginMutation();

	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (values) => {
		console.log(values);
		try {
			const body_data = {
				email: values.email,
				password: values.password,
			};
			const payload = await login({ body_data }).unwrap();
			dispatch(setAuthData(payload))
			Snackbar.success(payload?.message);
		} catch (error) {
			Snackbar.error(error?.data?.message || CONSTANTS.ERROR_MESSAGE.SOMETHING_WENT_WRONG);
		}
	}

	return (
		<>
			<div className="container">
				<div className="row my-4">
					<div className="col-12 col-md-4">
						<CommonImage />
					</div>
					<div className="col-12 col-md-8 mx-auto d-flex align-items-center justify-content-center">
						<div className="login-form col-12 col-md-8">
							
						<h2 className='text-center text-decoration-underline'>{CONSTANTS.LABELS.LOGIN}</h2>
						<Formik
							initialValues={{
								email: "",
								password: ""
							}}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							{({ values, errors }) => (
								<Form >

									<div className="field-class position-relative col-md-12 mx-auto mb-3">
									<i className='bx bxs-user' ></i>
										<TextField
											name={"email"}
											placeholder={CONSTANTS.PLACEHOLDER.EMAIL}
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
										onClick={() => navigate(ROUTE_CONSTANTS.REGISTER)}
									>Create a new account !</p>
									<button
										type='submit'
										className='budget-button col-md-6 mx-auto mb-2'
										disabled={isLoading}
									>{isLoading? <ShowLoader />: CONSTANTS.LABELS.LOGIN}</button>
								</Form>
							)}
						</Formik>
						
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login
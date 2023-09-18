import React, { useEffect, useState } from 'react';
import { useDeleteBudgetMutation, useGetBudgetDataQuery, useLazyGetBudgetDataQuery, useUpdateBudgetMutation } from '../../services/BudgetServices';
import CommonBudgetCard from '../../components/atoms/CommonBudgetCard';
import { useSelector } from 'react-redux';
import { FieldArray, Form, Formik } from 'formik';
import TextField from '../../components/atoms/TextField';
import CustomModalBody from '../../components/atoms/CustomModalBody';
import ReactModal from '../../components/atoms/ReactModal';
import { CONSTANTS } from '../../shared/constants';
import moment from 'moment';
import * as Yup from "yup"
import SecondHeader from '../../components/atoms/SecondHeader';
import ConfirmationModal from "../../components/atoms/ConfirmationModal"
import Snackbar from '../../shared/Snackbar';
import ReactLineChart from '../../components/atoms/ReactLineChart';

const validationSchema = Yup.object({
	budget_list: Yup.array().of(
		Yup.object().shape({
			budget_name: Yup.string().required(CONSTANTS.ERROR_MESSAGE.FIELD_REQUIRED),
			budget_cost: Yup.number().required(CONSTANTS.ERROR_MESSAGE.FIELD_REQUIRED).typeError("Cost must be number"),
		})
	),
	date: Yup.date().required('Date is required')
});

const initialValue = 0;

const Home = () => {
	const [getBudgetData] = useLazyGetBudgetDataQuery()
	const [updateBudget, { isLoading: isLoadingEdit }] = useUpdateBudgetMutation()
	const [deleteBudget] = useDeleteBudgetMutation()

	const { data } = useGetBudgetDataQuery()

	const profileRed = useSelector((state) => state?.persistedReducer.auth.auth_data)

	const [budgetData, setBudgetData] = useState([])
	const [currentData, setCurrentData] = useState("")
	const [openEdit, setOpenEdit] = useState(false)
	const [openDelete, setOpenDelete] = useState(false)

	const closeEditModal = () => setOpenEdit(false)
	const closeDeleteModal = () => setOpenDelete(false)

	const resetData = () => {
		setCurrentData("")
		setOpenEdit(false)
		setOpenDelete(false)
	}

	const handleClick = (data) => {
		console.log(data);
	}

	const handleEdit = (data) => {
		setCurrentData(data);
		setOpenEdit(true)
	}

	// Edit Budget
	const handleSubmit = async (values) => {
		console.log(values);
		try {
			let total_budget = values?.budget_list?.reduce((accumulator, currentValue) => {
				return accumulator + Number(currentValue.budget_cost);
			}, initialValue);

			const body_data = {
				budget_list: values.budget_list,
				total_budget: total_budget,
				budget_date: moment(values.date).format("DD-MM-YYYY"),
			};

			console.log(body_data);
			const payload = await updateBudget({ body_data, id: currentData?._id }).unwrap();
			getBudgetData()
			Snackbar.success(payload?.message);
			resetData()
		} catch (error) {
			Snackbar.error(error?.data?.message || CONSTANTS.ERROR_MESSAGE.SOMETHING_WENT_WRONG);
			resetData()
		}
	}

	// Delete Budget
	const handleDeleteSubmit = async (values) => {
		console.log(values);
		try {
			const payload = await deleteBudget({ id: currentData?._id }).unwrap();
			getBudgetData()
			Snackbar.success(payload?.message);
			resetData()
		} catch (error) {
			Snackbar.error(error?.data?.message || CONSTANTS.ERROR_MESSAGE.SOMETHING_WENT_WRONG);
			resetData()
		}
	}

	const handleDelete = (data) => {
		setCurrentData(data);
		setOpenDelete(true)
	}

	useEffect(() => {
		if (data) setBudgetData(data?.data)
	}, [data])

	useEffect(() => {
		getBudgetData()
	}, [])

	return (
		<>


			<ReactModal
				isOpen={openEdit}
				handleToggle={closeEditModal}
				title={"Budget" || CONSTANTS.LABELS.ADD_BUDGET}
			>
				<CustomModalBody>
					<Formik
						initialValues={{
							date: moment(currentData?.budget_date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
							budget_list: currentData?.budget_list
						}}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ values, setFieldValue, errors }) => (
							<Form >
								<div className="field-class position-relative col-md-12 mx-auto mb-3">
									<label htmlFor="date mb-4 ">{CONSTANTS.LABELS.DATE}</label>
									<TextField
										name={"date"}
										type={"date"}
										value={values.date}
										onChange={(e) => setFieldValue("date", e.target.value)}
										disabled
										placeholder={CONSTANTS.PLACEHOLDER.DATE}
									/>
								</div>

								<FieldArray
									name="budget_list"
									render={({ insert, remove, push }) => (
										<>
											{values.budget_list &&
												values.budget_list.length > 0 &&
												values.budget_list.map((budget_list, index) => (
													<>

														<div className='row item-array  position-relative p-0  rounded' key={index}>

															<div className="col-6 mb-2">

																<TextField
																	isFormarray={true}
																	name={`budget_list.${index}.budget_name`}
																	type={"text"}
																	placeholder={CONSTANTS.PLACEHOLDER.BUDGET_NAME}
																/>
															</div>
															<div className="col-6 mb-2">
																<TextField
																	isFormarray={true}
																	name={`budget_list.${index}.budget_cost`}
																	type={"text"}
																	placeholder={CONSTANTS.PLACEHOLDER.BUDGET_COST}
																/>
															</div>
															{index != "0" ? (
																<i className='bx bx-x'
																	onClick={() => remove(index)}
																></i>) : null}
														</div>
														<div className='field-required-error'>{errors?.budget_list?.[index]?.budget_name || errors?.budget_list?.[index]?.budget_cost}</div>
													</>
												))}

											<i className='bx bx-plus border rounded p-2'
												onClick={() => push({ budget_name: "", budget_cost: "" })}
											></i>
										</>
									)}
								/>

								{!isLoadingEdit ?
									(<button
										type='submit'
										className='budget-button col-md-6 mx-auto mb-2'
									>{CONSTANTS.LABELS.EDIT}</button>
									) : (
										<div className="spinner-border" role="status">
											<span className="sr-only"></span>
										</div>
									)}
							</Form>
						)}
					</Formik>
				</CustomModalBody>
			</ReactModal>

			<ConfirmationModal
				openModal={openDelete}
				closeModal={closeDeleteModal}
				desc={"Are you sure you want to delete ?"}
				buttonText={"Delete"}
				handleAction={handleDeleteSubmit}
			/>

			{/* <SecondHeader /> */}
			<h2>Welcome {profileRed?.name} 🎉!</h2>
			<div className="row">
				{budgetData?.map((data) => {
					return (
						<>

							<div className="col-md-6">

								<CommonBudgetCard
									key={data?._id}
									data={data}
									handleClick={() => handleClick(data)}
									handleEdit={() => handleEdit(data)}
									handleDelete={() => handleDelete(data)}
								/>
							</div>
							<div className="col-md-6">

								<ReactLineChart 
									labels={data?.budget_list.map((item) => item?.budget_name)}
									graph_data={data?.budget_list.map((item) => item?.budget_cost)}
								/>
							</div>
						</>
					)
				})}
			</div>
		</>
	)
}

export default Home
// libs
import moment from 'moment';
import * as Yup from "yup"
import { FieldArray, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// components
import ConfirmationModal from "../../components/atoms/ConfirmationModal"
import CommonBudgetCard from '../../components/atoms/CommonBudgetCard';
import CustomModalBody from '../../components/atoms/CustomModalBody';
import ReactModal from '../../components/atoms/ReactModal';
import TextField from '../../components/atoms/TextField';
import ReactSelect from "../../components/atoms/ReactSelect"

// constants
import Snackbar from '../../shared/snackbar';
import { CONSTANTS } from '../../shared/constants';

// services
import { useDeleteBudgetMutation, useGetBudgetDataQuery, useLazyGetBudgetDataQuery, useUpdateBudgetMutation } from '../../services/BudgetServices';

// reducer
import { setBudgetListData } from '../../reducer/Budget';
import { UTILS } from '../../shared/utils';
import ShowLoader from '../../components/atoms/ShowLoader';

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

const BudgetHistory = () => {
	const dispatch = useDispatch();
	const [getBudgetData] = useLazyGetBudgetDataQuery()
	const [updateBudget, { isLoading: isLoadingEdit }] = useUpdateBudgetMutation()
	const [deleteBudget, { isLoading: isLoadingDelete }] = useDeleteBudgetMutation()

	const { data } = useGetBudgetDataQuery()

	const profileRed = useSelector((state) => state?.persistedReducer.auth.auth_data)
	const budgetListRed = useSelector((state) => state?.persistedReducer?.budget?.budget_list) || []

	const [budgetData, setBudgetData] = useState([])
	const [monthFilterOptions, setMonthFilterOptions] = useState([])
	const [currentData, setCurrentData] = useState("")
	const [openEdit, setOpenEdit] = useState(false)
	const [openDelete, setOpenDelete] = useState(false)
	const [selectMonth, setSelectedMonth] = useState("")

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
				budget_date: UTILS.getDateWithoutTimeZone(values.date),
			};

			console.log(body_data);
			if (!currentData?._id) return;
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
			if (!currentData?._id) return;
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
		if (data?.data) {
			dispatch(setBudgetListData(data?.data))
			let required_months = []
			data?.data?.forEach(element => {
				let months = moment(element?.budget_date, "DD-MM_YYYY").format("MMMM")
				if (!required_months?.includes(months)) {
					required_months.push(months)
				}
			});
			setMonthFilterOptions(() => ([...required_months.map(item => ({ label: item, value: item }))]))
			setBudgetData(data?.data)
		}
	}, [data])

	useEffect(() => {
		if (selectMonth) {
			setBudgetData(() => ([...budgetListRed.filter(item => moment(item?.budget_date, "DD-MM_YYYY").format("MMMM") == selectMonth?.value)]))
			return;
		}
		setBudgetData(budgetListRed)
	}, [selectMonth])

	useEffect(() => {
		getBudgetData()
	}, [])

	return (
		<>

			{/* Edit Budget Modal  */}
			<ReactModal
				isOpen={openEdit}
				handleToggle={closeEditModal}
				title={CONSTANTS.LABELS.BUDGET}
			>
				<CustomModalBody>
					<Formik
						initialValues={{
							date: currentData?.budget_date?.split("T")?.[0],
							budget_list: currentData?.budget_list
						}}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ values, setFieldValue, errors }) => (
							<Form >
								<div className="field-class position-relative col-md-12 mx-auto mb-3">
									<label htmlFor="date mb-4 ">{CONSTANTS.LABELS.DATE} </label>
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


								<button
									type='submit'
									className='budget-button col-md-6 mx-auto mb-2'
									disabled={isLoadingEdit}
								>{isLoadingEdit ? <ShowLoader /> : CONSTANTS.LABELS.EDIT}</button>

							</Form>
						)}
					</Formik>
				</CustomModalBody>
			</ReactModal>

			<div className='d-flex justify-content-end'>
				<ReactSelect
					value={selectMonth}
					onChange={(e) => setSelectedMonth(e)}
					options={monthFilterOptions}
				/>
				{selectMonth ? (<button className='btn btn-danger ms-2' onClick={() => setSelectedMonth("")}>Reset</button>) : null}
			</div>

			<ConfirmationModal
				openModal={openDelete}
				closeModal={closeDeleteModal}
				desc={"Are you sure you want to delete ?"}
				buttonText={"Delete"}
				isLoadingDelete={isLoadingDelete}
				handleAction={handleDeleteSubmit}
			/>

			{/* <SecondHeader /> */}
			<h2> {profileRed?.name} Your Budget History🎉!</h2>
			<div className="row">
				{budgetData?.map((data) => {
					return (
						<>
							<CommonBudgetCard
								key={data?._id}
								data={data}
								handleClick={() => handleClick(data)}
								handleEdit={() => handleEdit(data)}
								handleDelete={() => handleDelete(data)}
							/>
						</>
					)
				})}
			</div >
		</>
	)
}

export default BudgetHistory
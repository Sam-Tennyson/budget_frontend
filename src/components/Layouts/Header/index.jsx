// libs
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from "yup"

// constants
import { CONSTANTS, RESPONSIVE } from '../../../shared/constants'
import { IMAGES } from '../../../shared/images'

// reducer
import { setAuthData } from '../../../reducer/AuthSlice'

// styles
import "./style.scss"
import ReactModal from '../../atoms/ReactModal'
import CustomModalBody from '../../atoms/CustomModalBody'
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import TextField from '../../atoms/TextField'
import { useCreateBudgetMutation, useLazyGetBudgetDataQuery, useLazyGetBudgetGraphDataQuery } from '../../../services/BudgetServices'
import Snackbar from '../../../shared/snackbar'
import moment from 'moment'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTE_CONSTANTS } from '../../../shared/routes'

const TAB_DATA = [
    {
        label: CONSTANTS.LABELS.WRITE_BUDGET, 
        id: CONSTANTS.LABELS.WRITE_BUDGET, 
        icon: <i className='bx bx-notepad'></i>,
    },
    {
        label: CONSTANTS.LABELS.MY_BUDGET_HISTORY, 
        id: CONSTANTS.LABELS.MY_BUDGET_HISTORY, 
        icon: <i className='bx bx-notepad'></i>,
        path: ROUTE_CONSTANTS.BUDGET_HISTORY,
    },
    {
        label: CONSTANTS.LABELS.LOGOUT,
        id: CONSTANTS.LABELS.LOGOUT, 
        icon: <i className='bx bx-log-out'></i>
    }
]

const initialValues = {
    date: CONSTANTS.EMPTY_STRING,
    budget_list: [{ budget_name: "", budget_cost: "" }]
}

const validationSchema = Yup.object({
    budget_list: Yup.array().of(
        Yup.object().shape({
            budget_name: Yup.string().required(CONSTANTS.ERROR_MESSAGE.FIELD_REQUIRED),
            budget_cost: Yup.number().required(CONSTANTS.ERROR_MESSAGE.FIELD_REQUIRED).typeError("Cost must be number"),
        })
    ),
    date: Yup.date().required('Date is required')
});

const initialValue = 0; // Initial value for the sum

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
	const startDateRef = useRef(moment("09-20-2023").utcOffset(0, true).format());
	const endDateRef = useRef(moment("09-25-2023").utcOffset(0, true).format());

    const [createBudget] = useCreateBudgetMutation()
    const [getBudgetData] = useLazyGetBudgetDataQuery();
    const [getBudgetGraphData] = useLazyGetBudgetGraphDataQuery()

    const [isOpen, setIsOpen] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    const [isWriteModal, setIsWriteModal] = useState(false)

    const closeWriteModal = () => setIsWriteModal(false)
    const handleToggle = () => {
        if (isMobile) {
            setIsOpen((prev) => !prev)
        }
    }

    // Hide & show humburger icon
    const handleWindowDimensions = () => {
        if (window.innerWidth <= RESPONSIVE.BREAKPOINT_NOT_MOBILE.MIN_WIDTH) {
            document.getElementById("hamburger-icon").style.display = "block"
            setIsOpen(false)
            setIsMobile(true)
            return;
        }
        document.getElementById("hamburger-icon").style.display = "none"
        setIsOpen(true)
        setIsMobile(false)
    }

    const handleLogut = () => dispatch(setAuthData(null));

    const handleTab = (data) => {
        handleToggle()
        if (data?.id === CONSTANTS.LABELS.LOGOUT) {
            handleLogut()
            return;
        }
        if (data?.id === CONSTANTS.LABELS.WRITE_BUDGET) {
            setIsWriteModal(true)
        }
        navigate({pathname: data?.path})
    }

    // Add Budget
    const handleSubmit = async (values) => {
        console.log(values);
        try {

            let total_budget = values?.budget_list?.reduce((accumulator, currentValue) => {
                return accumulator + Number(currentValue.budget_cost);
              }, initialValue);
              
            const body_data = {
                budget_list: values.budget_list,
                total_budget: total_budget,
                budget_date: moment(values.date).utcOffset(0, true).format(),
            };

            console.log(body_data);
            const payload = await createBudget({ body_data }).unwrap();
            if (location.pathname === ROUTE_CONSTANTS.HOME) {
                getBudgetGraphData({ query_params: `?startDate=${startDateRef.current}&endDate=${endDateRef.current}&year=09` })
            }
            if (location.pathname === ROUTE_CONSTANTS.BUDGET_HISTORY) {
                getBudgetData()
            }
            Snackbar.success(payload?.message);
            closeWriteModal()
        } catch (error) {
            Snackbar.error(error?.data?.message || CONSTANTS.ERROR_MESSAGE.SOMETHING_WENT_WRONG);
            closeWriteModal()
        }
    }

    useEffect(() => {
        handleWindowDimensions()
        window.addEventListener("resize", handleWindowDimensions)
        return () => {
            window.removeEventListener("resise", handleWindowDimensions)
        }
    }, [])

    return (
        <>

            <ReactModal
                isOpen={isWriteModal}
                handleToggle={closeWriteModal}
                title={"Budget" || CONSTANTS.LABELS.ADD_BUDGET}
            >
                <CustomModalBody>
                    <Formik
                        initialValues={initialValues}
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
                                        min={new Date().toISOString().split('T')[0]}
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
                                >{CONSTANTS.LABELS.ADD}</button>
                            </Form>
                        )}
                    </Formik>
                </CustomModalBody>
            </ReactModal>

            <header className='px-4 header d-flex justify-content-between align-items-center'>
                <em
                    onClick={() => navigate({pathname: ROUTE_CONSTANTS.HOME})}
                ><img src={IMAGES.budgetIcon} alt="icon" /></em>
                <h3 className='heading_title'> {CONSTANTS.LABELS.BUDGET_CONTROLLER} </h3>
                {isOpen ? (
                    <i className='bx bx-x' id="hamburger-icon"
                        onClick={handleToggle}
                    ></i>
                ) : (
                    <i className='bx bx-menu' id="hamburger-icon"
                        onClick={handleToggle}
                    ></i>
                )}
                <nav className={`navbar p-0 my-nav ${!isOpen ? "d-none" : ""} `}>
                    {TAB_DATA.map((item) => (
                        <a key={item?.id}
                            onClick={() => handleTab(item)}
                        >
                            <i className="d-flex justify-content-center align-items-center">
                                <span> {item?.icon} </span> &nbsp; <span> {item?.label} </span>
                            </i>
                        </a>
                    ))}
                </nav>
            </header>
        </>
    )
}

export default Header
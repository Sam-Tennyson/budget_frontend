// libs
import React, { useEffect, useState } from 'react'
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
import { Form, Formik } from 'formik'
import TextField from '../../atoms/TextField'
import { useCreateBudgetMutation } from '../../../services/BudgetServices'
import Snackbar from '../../../shared/Snackbar'

const TAB_DATA = [
    {
        label: CONSTANTS.LABELS.WRITE_BUDGET, id: CONSTANTS.LABELS.WRITE_BUDGET, icon: <i className='bx bx-notepad'></i>
    },
    {
        label: CONSTANTS.LABELS.LOGOUT, id: CONSTANTS.LABELS.LOGOUT, icon: <i className='bx bx-log-out'></i>
    }
]

const  initialValues = {
    budget_name: CONSTANTS.EMPTY_STRING,
    budget_cost: CONSTANTS.EMPTY_STRING,
    date: CONSTANTS.EMPTY_STRING,
}

const validationSchema = Yup.object({
	budget_name:  Yup.string().trim().required(CONSTANTS.ERROR_MESSAGE.FIELD_REQUIRED),
    budget_cost: Yup.string().trim().required(CONSTANTS.ERROR_MESSAGE.FIELD_REQUIRED),
    date: Yup.date()
    .required('Date is required')
    // .min(new Date(), 'Date must be in the future')
});

const Header = () => {

    const dispatch = useDispatch();
    const [createBudget] =useCreateBudgetMutation()

    const [isOpen, setIsOpen] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    const [isWriteModal, setIsWriteModal] = useState(false)

    const closeWriteModal = () => setIsWriteModal(false)
    const handleToggle = () => {
        if (isMobile) {
            setIsOpen((prev) => !prev)
        }
    }

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
    }

    const handleSubmit = async (values) => {
        try {
			const body_data = {
				budget_item_name: values.budget_name,
				budget_cost: values.budget_cost,
                budget_date: values.date,
			};
			const payload = await createBudget({ body_data }).unwrap();
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
                    {/* <div className="mx-auto col-md-10"> */}
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ values, setFieldValue }) => (
                                <Form >
                                    <div className="field-class position-relative col-md-12 mx-auto mb-3">
                                        <label htmlFor="budget_name mb-4 ">{CONSTANTS.LABELS.BUDGET_NAME}</label>
                                        <TextField
                                            name={"budget_name"}
                                            type={"text"}
                                            placeholder={CONSTANTS.PLACEHOLDER.BUDGET_NAME}
                                        />
                                    </div>
                                    <div className="field-class position-relative col-md-12 mx-auto mb-3">
                                        <label htmlFor="budget_cost mb-4 ">{CONSTANTS.LABELS.BUDGET_COST}</label>
                                        <TextField
                                            name={"budget_cost"}
                                            type={"text"}
                                            placeholder={CONSTANTS.PLACEHOLDER.BUDGET_COST}
                                        />
                                    </div>
                                    <div className="field-class position-relative col-md-12 mx-auto mb-3">
                                        <label htmlFor="date mb-4 ">{CONSTANTS.LABELS.DATE}</label>
                                        <TextField
                                            name={"date"}
                                            type={"date"}
                                            value={values.date}
                                            onChange={(e) => setFieldValue("date",e.target.value)}
                                            placeholder={CONSTANTS.PLACEHOLDER.DATE}
                                        />
                                    </div>
                                    <button
                                        type='submit'
                                        className='budget-button col-md-6 mx-auto mb-2'
                                    >{CONSTANTS.LABELS.ADD}</button>
                                </Form>
                            )}
                        </Formik>

                    {/* </div> */}
                </CustomModalBody>
            </ReactModal>

            <header className='px-4 header d-flex justify-content-between align-items-center flex-md-row flex-column'>
                <em><img src={IMAGES.iconSvg} alt="icon" /></em>
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
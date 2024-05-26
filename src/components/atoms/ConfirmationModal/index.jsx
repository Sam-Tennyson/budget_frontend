// libs
import React from 'react'

// components
import CustomModalBody from '../CustomModalBody'
import ReactModal from '../ReactModal'
import ShowLoader from '../ShowLoader'

// constants
import { CONSTANTS } from '../../../shared/constants'

// styles
import "./style.scss"

const ConfirmationModal = ({
	openModal, closeModal, desc, buttonText, isLoadingDelete=false,
	handleAction = () => { }
}) => {

	const footerChild = () => (
		<div className="d-flex justify-content-center align-items-center my-4">
			<button className='btn-budget-secondary mx-2'
				onClick={closeModal}
			>{CONSTANTS.LABELS.CANCEL}</button>
			<button className='btn-budget-danger mx-2'
				onClick={handleAction}
				disabled={isLoadingDelete}
			>{isLoadingDelete? <ShowLoader />: buttonText}</button>
		</div>
	)
	return (
		<>
			<ReactModal
				isOpen={openModal}
				handleToggle={closeModal}
				title={CONSTANTS.LABELS.CONFIRMATION}
			>
				<CustomModalBody
					hasFooter={true}
					footerChild={footerChild}
				>
					<h5 className='text-center mb-2'>{desc}</h5>
				</CustomModalBody>
			</ReactModal>
		</>
	)
}

export default ConfirmationModal
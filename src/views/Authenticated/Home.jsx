import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../reducer/AuthSlice';
import ConfirmationModal from '../../components/atoms/ConfirmationModal';

const Home = () => {
	const [openModal, setOpenModal] = useState(true);
	return (
		<>
			<ConfirmationModal
				openModal={openModal}
				closeModal={() => setOpenModal(false)}
				desc={"asdf"}
				buttonText={"TT"}
				handleAction={() => { }}
			/>
			Home
		</>
	)
}

export default Home
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setWriteBudgetModal } from '../reducer/Budget';

export default function useModal() {
    const dispatch = useDispatch();
    const writeModal = useSelector(state => state.persistedReducer.budget.write_budget_modal)
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => dispatch(setWriteBudgetModal(true))
    const handleCloseModal = () => dispatch(setWriteBudgetModal(false))

    useEffect(() => {
        setOpenModal(writeModal)
    }, [writeModal])

    return {
        openModal, handleCloseModal, handleOpenModal
    }
}

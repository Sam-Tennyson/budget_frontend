import React, { useEffect } from 'react'
import { useCreateBudgetMutation, useLazyGetBudgetDataQuery } from '../services/BudgetServices'
import { useDispatch } from 'react-redux';
import { setBudgetListData } from '../reducer/Budget';
import Snackbar from '../shared/Snackbar';

const Dashboard = () => {
    const dispatch = useDispatch();
    const [createBudget] = useCreateBudgetMutation();
    const [getBudgetData] = useLazyGetBudgetDataQuery();

    const handleAdd = async () => {
        try {
            const body_data = {
                budget_item_name: "Bet",
                budget_cost: "500",
            };
            const result = await createBudget({
                body_data,
            });
            console.log("Create API response:", result);
        } catch (error) {
            console.error("Error while creating:", error);
        }
    };


    const fetchData = async () => {
        try {
            const {isError, isSuccess, error, data} = await getBudgetData()
            if (isError) throw new Error(error.error)
            dispatch(setBudgetListData(data?.data))
        } catch (error) {
            console.log(error);
            Snackbar.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <button className='btn btn-primary'
                onClick={handleAdd}
            >Add</button>
        </>
    )
}

export default Dashboard
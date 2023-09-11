import React, { useEffect } from 'react'
import { useCreateBudgetMutation, useLazyGetBudgetDataQuery } from '../services/BudgetServices'
import { useDispatch } from 'react-redux';
import Snackbar from '../shared/Snackbar';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../shared/routes';
import CommonHeader from '../components/atoms/CommonHeader';

// style
import "./style.scss";
import { IMAGES } from '../shared/images';
import { CONSTANTS } from '../shared/constants';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            // dispatch(setBudgetListData(data?.data))
        } catch (error) {
            console.log(error);
            Snackbar.error(error)
        }
    }

    useEffect(() => {
        // fetchData()
    }, [])

    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <div>
                    <CommonHeader />
                    <div className='d-flex justify-content-center align-items-center flex-column text-center dashboard-button'>
                        <em><img src={IMAGES.iconSvg} alt="icon" /></em>
                        <button className='my-2'
                            onClick={() => navigate(ROUTE_CONSTANTS.REGISTER)}
                            >{CONSTANTS.LABELS.REGISTER}</button>
                        <button
                            onClick={() => navigate(ROUTE_CONSTANTS.LOGIN)}
                        >{CONSTANTS.LABELS.LOGIN}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
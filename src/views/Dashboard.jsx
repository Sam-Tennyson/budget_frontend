// libs
import React from 'react'
import { useNavigate } from 'react-router-dom';

// constants
import { ROUTE_CONSTANTS } from '../shared/routes';
import { IMAGES } from '../shared/images';
import { CONSTANTS } from '../shared/constants';

// components
import CommonHeader from '../components/atoms/CommonHeader';

// style
import "./style.scss";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <div>
                    <CommonHeader />
                    <div className='d-flex justify-content-center align-items-center flex-column text-center dashboard-button'>
                        <em><img src={IMAGES.budgetIcon} alt="icon" /></em>
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
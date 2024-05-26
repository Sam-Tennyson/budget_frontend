import React from 'react'
import "./style.scss"
import { IMAGES } from '../../../shared/images'
import { useNavigate } from 'react-router-dom'
import { ROUTE_CONSTANTS } from '../../../shared/routes'

const CommonImage = () => {
    const navigate = useNavigate();

    return (
        <>
            <em
                onClick={() => navigate(ROUTE_CONSTANTS.DASHBOARD)}
            >
                <img src={IMAGES.authImage} alt="" />
            </em>
        </>
    )
}

export default CommonImage
// libs
import React, { useEffect, useState } from 'react'

// constants
import { CONSTANTS, RESPONSIVE } from '../../../shared/constants'
import { IMAGES } from '../../../shared/images'

// styles
import "./style.scss"
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../../reducer/AuthSlice'

const TAB_DATA = [
    {
        label: CONSTANTS.LABELS.LOGOUT, id: CONSTANTS.LABELS.LOGOUT, icon: <i className='bx bx-log-out'></i>
    }
]

const Header = () => {

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(true)
    
    const [isMobile, setIsMobile] = useState(false)
    
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
        if (data?.id === CONSTANTS.LABELS.LOGOUT) {
            handleLogut()
            return;
        }   
        handleToggle()
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
            <header className='px-4 header d-flex justify-content-between align-items-center'>
                <em><img src={IMAGES.iconSvg} alt="icon" /></em>
                <h3> {CONSTANTS.LABELS.BUDGET_CONTROLLER} </h3>
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
                        <a href={item?.id} key={item?.id}
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
import React from 'react'
import { IMAGES } from '../../../shared/images'

// styles
import "./style.scss"

const SecondHeader = () => {
  return (
    <>
        <em className='image-header'>
            <img src={IMAGES.imageHeader} alt={"image-header"} />
        </em> 
    </>
  )
}

export default SecondHeader
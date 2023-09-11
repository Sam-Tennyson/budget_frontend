import React from 'react'
import { Modal } from 'react-bootstrap'

const CustomModalBody = ({
    children,
    hasFooter=false,
    footerChild =() => {}
}) => {
  return (
    <>
        <Modal.Body>
            {children}
        </Modal.Body>
        {hasFooter ? (
            <Modal.Footer className={`d-flex justify-content-center align-items-center`}>
                {footerChild()}
            </Modal.Footer>
        ) : null}
    </>
  )
}

export default CustomModalBody
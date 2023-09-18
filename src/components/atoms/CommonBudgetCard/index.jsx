import React from 'react'
import "./style.scss"
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';

const CommonBudgetCard = (props) => {
    const {
        data,
        handleClick = () => { },
        handleEdit = () => { },
        handleDelete = () => { },
    } = props;

    return (
        <>
            <div className="budget-card my-2 col-12 "
                onClick={handleClick}
            >
                <div className="card position-relative p-4">
                    <div className=" d-flex justify-content-between align-items-center mb-2">
                        <h3 className='mb-0'>{data?.budget_date}</h3>
                        <div className="icon-button mb-0">

                            <i className='bx bx-pencil me-3'
                                onClick={handleEdit}
                            ></i>
                            <i className='bx bx-x'
                                onClick={handleDelete}
                            ></i>

                        </div>
                    </div>
                    
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Budget Name</th>
                                <th>Budget Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.budget_list?.map((item) => {
                                return (
                                    <tr
                                        key={item?._id}
                                    >
                                        <td>{item?.budget_name}</td>
                                        <td>{item?.budget_cost}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <p className='text-end'><b>&#x20b9; &nbsp;{data?.total_budget}</b> (Total Budget)</p>

                    <div>{data?.budget_cost}</div>
                </div>
            </div>
        </>
    )
}

export default CommonBudgetCard
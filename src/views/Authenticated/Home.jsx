// libs
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

// services
import { useGetBudgetGraphDataQuery, useLazyGetBudgetGraphDataQuery } from '../../services/BudgetServices';

// components
import SecondHeader from '../../components/atoms/SecondHeader';
import ReactLineChart from '../../components/atoms/ReactLineChart';
import ReactSelect from '../../components/atoms/ReactSelect';

// reducers
import { setBudgetGraph } from '../../reducer/Budget';

// utils & constants
import { UTILS } from '../../shared/utils';
import { monthArray } from '../../shared/constants';

const Home = () => {
	const dispatch = useDispatch();
	const currentYearRef = useRef(new Date().getFullYear());

	const endDateRef = useRef(UTILS.getDateWithoutTimeZone(UTILS.getDateWithoutTimeZone("09-30-2023")));
	const startDateRef = useRef(UTILS.getDateWithoutTimeZone(UTILS.getDateWithoutTimeZone("09-01-2023")));

	const {data} = useGetBudgetGraphDataQuery({
		query_params: `?startDate=${startDateRef.current}&endDate=${endDateRef.current}`
		// query_params: `?month=09&year=2023`
	})

	const [getBudgetGraphData, {data: newData}] = useLazyGetBudgetGraphDataQuery()

	const [monthsData, setMonthsData] = useState(monthArray)
	const [selectMonth, setSelectedMonth] = useState(monthArray.find(item => item?.value === new Date().getMonth()+1))
	
	const profileRed = useSelector((state) => state?.persistedReducer.auth.auth_data)
	const budgetGraphRed = useSelector((state) => state?.persistedReducer.budget.graph_data) || []

	useEffect(() => {
		if (data) {
			dispatch(setBudgetGraph(data?.data))
		}
	}, [data])
	
	useEffect(() =>{
		if (newData) {
			dispatch(setBudgetGraph(newData?.data))
		}
	}, [newData])

	useEffect(() => {
		
		// make required month array
		setMonthsData((prev) => {
			let update_array = prev.map(item => {
				let {start_date, end_date} = UTILS.getMonthStartAndEndDate(item?.value, currentYearRef.current)
				let start_date_ISO = UTILS.getDateWithoutTimeZone(start_date)
				let end_date_ISO = UTILS.getDateWithoutTimeZone(end_date)
				return ({label: item?.label, value: item?.label, start_date_ISO, end_date_ISO})
			})
			return update_array
		})

		if (data && Object?.keys(data)?.length) getBudgetGraphData({
			query_params: `?startDate=${startDateRef.current}&endDate=${endDateRef.current}`
		}) 

	}, [])

	return (
		<>
			<div className="row">
				<div className="col-md-6">
					<h2>Welcome {profileRed?.name} 🎉!</h2>
					<SecondHeader />
				</div>
				{budgetGraphRed?.length ? (
					<div className='col-md-6'>
									<div className='d-flex justify-content-end'>
										<ReactSelect 
											value={selectMonth}
											onChange={(e) => {
												console.log(e);
												getBudgetGraphData({
													query_params: `?startDate=${e.start_date_ISO}&endDate=${e.end_date_ISO}`
												})
												setSelectedMonth(e)
											}}
											options={monthsData}
										/>
										{/* {selectMonth ? (<button className='btn btn-danger ms-2' onClick={() => setSelectedMonth("")}>Reset</button>): null} */}
									</div>
						<ReactLineChart
							labels={budgetGraphRed?.map(item => moment(item?.date).format("ll"))}
							graph_data={budgetGraphRed?.map(item => item?.total_budget)}
						/>
					</div>
				) : null}
			</div>
		</>
	)
}

export default Home
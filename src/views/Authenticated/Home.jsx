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
import { setBudgetGraph, setWriteBudgetModal } from '../../reducer/Budget';

// utils & constants
import { UTILS } from '../../shared/utils';
import { monthArray } from '../../shared/constants';

const Home = () => {
	const dispatch = useDispatch();
	const currentYearRef = useRef(new Date().getFullYear());

	let { start_date, end_date } = UTILS.getMonthStartAndEndDate(new Date().getMonth() + 1, new Date().getFullYear())

	const endDateRef = useRef(UTILS.getDateWithoutTimeZone(end_date));
	const startDateRef = useRef(UTILS.getDateWithoutTimeZone(start_date));

	const { data } = useGetBudgetGraphDataQuery({ query_params: `?startDate=${startDateRef.current}&endDate=${endDateRef.current}` })

	const [getBudgetGraphData, { data: newData }] = useLazyGetBudgetGraphDataQuery()

	const [monthsData, setMonthsData] = useState(monthArray)
	const [selectMonth, setSelectedMonth] = useState(monthArray.find(item => item?.value === new Date().getMonth() + 1))

	const profileRed = useSelector((state) => state?.persistedReducer.auth.auth_data)
	const budgetGraphRed = useSelector((state) => state?.persistedReducer.budget.graph_data) || []

	  
	const controlScrollMagic = () => {
		// Scroll to the bottom of the page
		window.scrollTo(0, document.documentElement.scrollHeight);

		// Wait for a few seconds
		setTimeout(() => {
			// Scroll to the top of the page
			window.scrollTo(0, 0);
		}, 2000); // 2 seconds
	}

	useEffect(() => {
		if (data) {
			dispatch(setBudgetGraph(data?.data))
			setSelectedMonth(monthArray.find(item => item?.value === new Date().getMonth() + 1))
		}
	}, [data])

	useEffect(() => {
		if (newData) {
			dispatch(setBudgetGraph(newData?.data))
		}
	}, [newData])

	useEffect(() => {

		// make required month array
		setMonthsData((prev) => {
			let update_array = prev.map(item => {
				let { start_date, end_date } = UTILS.getMonthStartAndEndDate(item?.value, currentYearRef.current)
				let start_date_ISO = UTILS.getDateWithoutTimeZone(start_date)
				let end_date_ISO = UTILS.getDateWithoutTimeZone(end_date)
				return ({ label: item?.label, value: item?.label, start_date_ISO, end_date_ISO })
			})
			return update_array
		})

		if (data && Object?.keys(data)?.length) getBudgetGraphData({
			query_params: `?startDate=${startDateRef.current}&endDate=${endDateRef.current}`
		})
		controlScrollMagic()
	}, [])

	return (
		<>
			<div className="row">
				<div className="col-md-6">
					<h2>Welcome {profileRed?.name} 🎉!</h2>
					<div className="alert alert-info fw-bold" role="alert">
						Add your monthly budget <span className='link-class' onClick={() => dispatch(setWriteBudgetModal(true))}>Click Here</span>
					</div>
					<SecondHeader />
				</div>
				{budgetGraphRed?.length ? (
					<div className='col-md-6'>
						<div className='d-flex justify-content-end'>
							<ReactSelect
								value={selectMonth}
								options={monthsData}
								onChange={(e) => {
									console.log(e);
									getBudgetGraphData({ query_params: `?startDate=${e.start_date_ISO}&endDate=${e.end_date_ISO}` })
									setSelectedMonth(e)
								}}
							/>

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
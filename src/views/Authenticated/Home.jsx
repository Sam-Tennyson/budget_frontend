// libs
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

// services
import { useGetBudgetGraphDataQuery, useLazyGetBudgetGraphDataQuery } from '../../services/BudgetServices';

// components
import SecondHeader from '../../components/atoms/SecondHeader';
import ReactLineChart from '../../components/atoms/ReactLineChart';
import { setBudgetGraph } from '../../reducer/Budget';
import { UTILS } from '../../shared/utils';

const Home = () => {
	const dispatch = useDispatch();
	const startDateRef = useRef(UTILS.getDateWithoutTimeZone("09-01-2023"));
	const endDateRef = useRef(UTILS.getDateWithoutTimeZone("09-30-2023"));

	const {data} = useGetBudgetGraphDataQuery({
		query_params: `?startDate=${startDateRef.current}&endDate=${endDateRef.current}`
		// query_params: `?month=09&year=2023`
	  })
	const [getBudgetGraphData] = useLazyGetBudgetGraphDataQuery()
	const profileRed = useSelector((state) => state?.persistedReducer.auth.auth_data)
	const budgetGraphRed = useSelector((state) => state?.persistedReducer.budget.graph_data) || []

	useEffect(() => {
		if (data) {
			dispatch(setBudgetGraph(data?.data))
		}
	}, [data])

	// useEffect(() => {
	// 	getBudgetGraphData({ query_params: `?startDate=${startDateRef.current}&endDate=${endDateRef.current}&year=09` })
	// }, [])

	return (
		<>
			<div className="row">
				<div className="col-md-6">
					<h2>Welcome {profileRed?.name} 🎉!</h2>
					<SecondHeader />
				</div>
				{budgetGraphRed?.length ? (
					<div className='col-md-6'>
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
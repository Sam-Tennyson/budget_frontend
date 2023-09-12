import React, { useEffect } from 'react';
import { useLazyGetBudgetDataQuery } from '../../services/BudgetServices';

const Home = () => {
	const [getBudgetData, {data}] = useLazyGetBudgetDataQuery();

	useEffect(() => {
		// You can access the data here when it's available
		getBudgetData()
	}, []);

	  console.log(data);
	return (
		<>
		
			Home
		</>
	)
}

export default Home
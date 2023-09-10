// libs
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { budgetApi } from '../services/BudgetServices'

// reducers
import Budget from '../reducer/Budget'

export const store = configureStore({
	reducer: {
		[budgetApi.reducerPath]: budgetApi.reducer,
        budget_data: Budget,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(budgetApi.middleware),
})

setupListeners(store.dispatch)
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	budget_list: 0,
}

export const budgetApiSlice = createSlice({
	name: 'budgetApi',
	initialState,
	reducers: {
		setBudgetListData: (state, action) => {
			state.budget_list = action.payload
		},

	},
})

// Action creators are generated for each case reducer function
export const { setBudgetListData, decrement, incrementByAmount } = budgetApiSlice.actions

export default budgetApiSlice.reducer
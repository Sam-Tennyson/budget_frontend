import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	budget_list: 0,
}

export const budgetSlice = createSlice({
	name: 'budgetApi',
	initialState,
	reducers: {
		setBudgetListData: (state, action) => {
			state.budget_list = action.payload
		},

	},
})

// Action creators are generated for each case reducer function
export const { setBudgetListData, decrement, incrementByAmount } = budgetSlice.actions

export default budgetSlice.reducer
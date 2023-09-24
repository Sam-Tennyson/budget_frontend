import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	budget_list: [],
	avaliable_month: [],
	graph_data: []
}

export const budgetApiSlice = createSlice({
	name: 'budgetApi',
	initialState,
	reducers: {
		setBudgetListData: (state, action) => {
			state.budget_list = action.payload
		},
		setBudgetsAvaliabledates: (state, action) => {
			state.avaliable_month = action.payload
		},
		setBudgetGraph: (state, action) => {
			state.graph_data = action.payload
		}
	},
})

// Action creators are generated for each case reducer function
export const { setBudgetListData, setBudgetsAvaliabledates, setBudgetGraph } = budgetApiSlice.actions

export default budgetApiSlice.reducer
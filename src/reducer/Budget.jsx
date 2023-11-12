import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	budget_list: [],
	avaliable_month: [],
	graph_data: [],
	write_budget_modal: false
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
		},
		setWriteBudgetModal: (state, action) => {
			state.write_budget_modal = action.payload
		}
	},
})

// Action creators are generated for each case reducer function
export const { setWriteBudgetModal, setBudgetListData, setBudgetsAvaliabledates, setBudgetGraph } = budgetApiSlice.actions

export default budgetApiSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	auth_data: null,
    token: null
}

export const authApiSlice = createSlice({
	name: 'authApi',
	initialState,
	reducers: {
		setAuthData: (state, action) => {
			state.auth_data = action.payload?.data
            state.token = action.payload?.token
		},
	},
})

// Action creators are generated for each case reducer function
export const { 
    setAuthData, 
} = authApiSlice.actions

export default authApiSlice.reducer
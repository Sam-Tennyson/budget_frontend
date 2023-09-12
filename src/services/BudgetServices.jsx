import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from '../api/constants';
import { UTILS } from '../shared/utils';
import { CONSTANTS } from '../shared/constants';

let base_url = API_BASE_URL

// Define a service using a base URL and expected endpoints
export const budgetApi = createApi({
    reducerPath: 'budgetApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: base_url, 
        prepareHeaders: (headers, { getState }) => {
            // Get the token from your Redux store or wherever it is stored
            const token = localStorage.getItem("token") // Adjust this based on your store structure

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            // You can add other headers if needed
            headers.set('Content-Type', 'application/json');
            headers.set("x-api-key", "test")
            return headers;
        },
    }),
    endpoints: (builder) => ({

        getBudgetData: builder.query({
            query: (payload) => ({
                url: `/budget${payload?.query_params || CONSTANTS.EMPTY_STRING}`,
                method: `GET`,
            })
        }),
        
        getBudgetDataById: builder.query({
            query: (payload) => ({
                url: `/budget/${payload?.id}`,
                method: `GET`,
            })
        }),

        deleteBudget: builder.mutation({
            query: (payload) => ({
                url: `/budget/${payload?.id}`,
                method: `DELETE`,
            })
        }),

        createBudget: builder.mutation({
            query: (payload) => ({
                url: `/budget/`,
                method: `POST`,
                body: payload.body_data,
            })
        }),


    }),
})

export const { 
    useGetBudgetDataQuery,
    useLazyGetBudgetDataQuery,
    useGetBudgetDataByIdQuery,
    useDeleteBudgetMutation,
    useCreateBudgetMutation,
} = budgetApi
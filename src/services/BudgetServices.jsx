import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

let base_url = 'http://localhost:3000/api'

// Define a service using a base URL and expected endpoints
export const budgetApi = createApi({
    reducerPath: 'budgetApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: base_url, 
        prepareHeaders: (headers, { getState }) => {
            // Get the token from your Redux store or wherever it is stored
            // const token = getState().auth.token; // Adjust this based on your store structure

            // if (token) {
            //     headers.set('Authorization', `Bearer ${token}`);
            // }

            // You can add other headers if needed
            // headers.set('Content-Type', 'application/json');
            // headers.set("x-api-key", "test")
            return headers;
        },
    }),
    endpoints: (builder) => ({

        getBudgetData: builder.query({
            query: () => ({
                url: `/bu12dget/`,
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
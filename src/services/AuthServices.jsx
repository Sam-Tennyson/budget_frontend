import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from '../api/constants'
import Snackbar from '../shared/Snackbar';
import { CONSTANTS } from '../shared/constants';

let base_url = API_BASE_URL

// Pick out errors and prevent nested properties in a hook or selector
const transformErrorResponse = (response, meta, arg) => {
    Snackbar.error(response.data.message || CONSTANTS.ERROR_MESSAGE.SOMETHING_WENT_WRONG);
    return response.status
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: base_url,
    }),

    endpoints: (builder) => ({

        register: builder.mutation({
            query: (payload) => ({
                url: `/auth/register`,
                method: `POST`,
                body: payload.body_data,
            }),
            invalidatesTags: ['User'],
        }),

        login: builder.mutation({
            query: (payload) => ({
                url: `/auth/login`,
                method: `POST`,
                body: payload.body_data,
            }),
            providesTags: ['User'],
        }),

    }),
})

export const { 
    useRegisterMutation,
    useLoginMutation
} = authApi
// ============================================
// api/baseApi.js - Core API Configuration
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Get API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            // Future: Get token from state
            // const token = getState().auth.token;
            // if (token) {
            //     headers.set('authorization', `Bearer ${token}`);
            // }
            return headers;
        },
    }),
    tagTypes: ['User', 'Auth'], // Define tag types here
    endpoints: () => ({}),
});

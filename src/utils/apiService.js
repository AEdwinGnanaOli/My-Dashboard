// api/baseApi.js - Base API setup
import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

// Axios instance configuration
export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Custom axios base query for RTK Query
const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
        async ({ url, method, data, params, headers }) => {
            try {
                const result = await axiosInstance({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers,
                });
                return { data: result.data };
            } catch (axiosError) {
                return {
                    error: {
                        status: axiosError.response?.status,
                        data: axiosError.response?.data || axiosError.message,
                    },
                };
            }
        };

// Base API
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    }),
    tagTypes: ['Auth', 'User', 'Posts', 'Products'],
    endpoints: () => ({}), // Endpoints will be injected
});

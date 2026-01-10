// ============================================
// api/userApi.js - Separate User API
import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query({
            query: () => ({
                url: '/users/me',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),

        updateUser: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                data,
            }),
            invalidatesTags: ['User'],
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useGetCurrentUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL || ""}` + "/api/order",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.user?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Orders", "Stats"],
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: () => "/my-orders",
      providesTags: ["Orders"],
    }),
    getAllOrders: builder.query({
      query: () => "/all", // <- Backend route is "/all"
      providesTags: ["Orders"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update/${id}`, // <- Backend update route
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Orders", "Stats"],
    }),
    getDashboardStats: builder.query({
      query: () => "/stats",
      providesTags: ["Stats"],
    }),
  }),
});

export const {
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetDashboardStatsQuery,
} = orderApi;

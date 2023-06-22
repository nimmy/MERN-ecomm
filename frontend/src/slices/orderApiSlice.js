import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrders: builder.mutation({
            query: (order) => ({
                url: `${ORDERS_URL}`,
                method: 'POST',
                body: {...order}
            })
        })
    })
});


export const { useCreateOrdersMutation } = orderApiSlice;

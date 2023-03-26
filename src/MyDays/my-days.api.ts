import { api } from "../api";

export const myDaysApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyDays: builder.query({
      query: () => "/my-day",
      providesTags: ["MyDays"]
    }),
    createMyDay: builder.mutation({
      query: (myDay: any) => ({
        url: "/my-day",
        method: "POST",
        body: myDay
      }),
      invalidatesTags: ["MyDays"]
    })
  })
});

export const {
  useGetMyDaysQuery: useGetMyDays,
  useCreateMyDayMutation: useCreateMyDay
} = myDaysApi;

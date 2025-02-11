import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types/global";
import { TMessage } from "@/types/message.type";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all message with optional query parameters
    getAllMessage: builder.query({
      query: (args?: TQueryParam[]) => {
        const params = new URLSearchParams();
        args?.forEach((item) => params.append(item.name, String(item.value)));

        return {
          url: `/message?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TMessage[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["Message"],
    }),

    //create a new message
    createMessage: builder.mutation({
      query: (message) => ({
        url: "/message",
        method: "POST",
        body: message,
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});

export const { useGetAllMessageQuery, useCreateMessageMutation } = messageApi;

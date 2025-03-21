/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import type { TQueryParam, TResponseRedux } from "@/types/global";

const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllExperiences: builder.query({
      query: (args?: TQueryParam[]) => {
        const params = new URLSearchParams();
        args?.forEach((item) => params.append(item.name, String(item.value)));

        return {
          url: `/experiences?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["Experience"],
    }),
  }),
});

export const { useGetAllExperiencesQuery } = experienceApi;

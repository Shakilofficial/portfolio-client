import { baseApi } from "@/redux/api/baseApi";
import type { TResponseRedux } from "@/types/global";
import { TSkillCategory } from "@/types/skill.type";

const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSkills: builder.query({
      query: () => ({
        url: "/skills/all",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TSkillCategory[]>) =>
        response.data,
      providesTags: ["Skills"],
    }),
  }),
});

export const { useGetAllSkillsQuery } = skillApi;

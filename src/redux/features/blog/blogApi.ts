import { baseApi } from "@/redux/api/baseApi";
import { TBlog } from "@/types/blog.type";

import { TQueryParam, TResponseRedux } from "@/types/global";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (args?: TQueryParam[]) => {
        const params = new URLSearchParams();
        args?.forEach((item) => params.append(item.name, String(item.value)));

        return {
          url: `/blogs?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TBlog[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["Blog"],
    }),

    getSingleBlog: builder.query({
      query: (slug: string) => ({
        url: `/blogs/${slug}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TBlog>) => response.data,
      providesTags: ["Blog"],
    }),
  }),
});

export const { useGetAllBlogsQuery, useGetSingleBlogQuery } = blogApi;

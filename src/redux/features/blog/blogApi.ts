import { baseApi } from "@/redux/api/baseApi";
import { TBlog } from "@/types/blog.type";
import { TQueryParam, TResponseRedux } from "@/types/global";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all blogs with optional query parameters
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

    // Fetch a single blog by ID
    getSingleBlog: builder.query({
      query: (id: string) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TBlog>) => response.data,
      providesTags: ["Blog"],
    }),

    //create a new blog
    createBlog: builder.mutation({
      query: (blog) => ({
        url: "/blogs",
        method: "POST",
        body: blog,
      }),
      invalidatesTags: ["Blog"],
    }),

    //update a blog
    updateBlog: builder.mutation({
      query: (blog) => ({
        url: `/blogs/${blog._id}`,
        method: "PATCH",
        body: blog,
      }),
      invalidatesTags: ["Blog"],
    }),

    //delete a blog
    deleteBlog: builder.mutation({
      query: (id: string) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),

    // Toggle blog featured status
    toggleBlogFeatured: builder.mutation({
      query: (id: string) => ({
        url: `/blogs/${id}/featured`,
        method: "PATCH",
      }),
      invalidatesTags: ["Blog"],
    }),

    // Toggle blog published status
    toggleBlogPublished: builder.mutation({
      query: (id: string) => ({
        url: `/blogs/${id}/published`,
        method: "PATCH",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useToggleBlogFeaturedMutation,
  useToggleBlogPublishedMutation,
} = blogApi;

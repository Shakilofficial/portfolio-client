import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types/global";
import { TProject } from "@/types/project.type";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all projects with optional query parameters
    getAllProjects: builder.query({
      query: (args?: TQueryParam[]) => {
        const params = new URLSearchParams();
        args?.forEach((item) => params.append(item.name, String(item.value)));

        return {
          url: `/projects?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TProject[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["Project"],
    }),

    // Fetch a single Project by ID
    getSingleProject: builder.query({
      query: (id: string) => ({
        url: `/projects/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TProject>) => response.data,
      providesTags: ["Project"],
    }),

    //create a new project
    createProject: builder.mutation({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),

    //update a project

    updateProject: builder.mutation({
      query: (project) => ({
        url: `/projects/${project._id}`,
        method: "PATCH",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),

    //delete a project
    deleteProject: builder.mutation({
      query: (id: string) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),

    // Toggle project featured status
    toggleProjectFeatured: builder.mutation({
      query: (id: string) => ({
        url: `/projects/${id}/featured`,
        method: "PATCH",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetSingleProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useToggleProjectFeaturedMutation,
} = projectApi;

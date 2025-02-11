/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { RootState } from "../store";

interface ErrorData {
  message: string;
  stack?: string;
  success: boolean;
}

interface IErrorResponse {
  status: number;
  data: ErrorData;
}

const API_BASE_URL = "https://portfolio-server-livid-alpha.vercel.app/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  IErrorResponse
> = async (args, api, extraOptions) => {
  try {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error) {
      throw result.error;
    }
    return result;
  } catch (error: any) {
    const errMessage = error?.data?.message || "Something went wrong!";
    toast.error(errMessage);
    return { error };
  }
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Project", "Blog", "Message"],
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});

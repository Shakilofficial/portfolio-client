/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

export const createBlog = async (data: FormData) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    });

    const result = await res.json();
    revalidateTag("BLOGS");
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateBlog = async (data: FormData, id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: token,
      },
      body: data,
    });

    const result = await res.json();
    revalidateTag("BLOGS");
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllBlogs = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query?.searchTerm)
    params.append("searchTerm", query.searchTerm.toString());

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs?limit=${limit}&page=${page}&${params}`,
      {
        next: { tags: ["BLOGS"] },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const toggledFeaturedBlog = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}/featured`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.json();
    revalidateTag("BLOGS");
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const toggledPublishBlog = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}/published`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.json();
    revalidateTag("BLOGS");
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const deleteBlog = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();
    revalidateTag("BLOGS");
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

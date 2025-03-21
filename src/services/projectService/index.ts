/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

export const getAllProjects = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects?limit=${limit}&page=${page}`,
      {
        next: { tags: ["PROJECTS"] },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const createProject = async (data: FormData) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    });

    const result = await res.json();
    revalidateTag("PROJECTS");
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateProject = async (data: FormData, id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: data,
      }
    );

    const result = await res.json();
    revalidateTag("PROJECTS");
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const toggledProjectFeatured = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}/featured`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.json();
    revalidateTag("PROJECTS");
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const deleteProject = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.json();
    revalidateTag("PROJECTS");
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

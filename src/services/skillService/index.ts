/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

export const createSkill = async (data: FormData) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    });

    const result = await res.json();
    revalidateTag("SKILLS");
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateSkill = async (data: FormData, id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: data,
      }
    );

    const result = await res.json();
    revalidateTag("SKILLS");
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllSKills = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query?.searchTerm)
    params.append("searchTerm", query.searchTerm.toString());

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills?limit=${limit}&page=${page}&${params}`,
      {
        next: { tags: ["SKILLS"] },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const deleteSkill = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.json();
    revalidateTag("SKILLS");
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

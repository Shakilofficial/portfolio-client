/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

export const getAllMessages = async (
  page?: string,
  limit?: string,
  searchTerm?: string
) => {
  const token = await getValidToken();
  const queryParams = new URLSearchParams();
  if (page) queryParams.append("page", page || "1");
  if (limit) queryParams.append("limit", limit || "10");
  if (searchTerm) queryParams.append("searchTerm", searchTerm);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/messages?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: { tags: ["MESSAGES"] },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const deleteMessage = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/messages/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.json();
    revalidateTag("MESSAGES");
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

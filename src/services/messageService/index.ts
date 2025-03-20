/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

export const getAllMessages = async (page?: string, limit?: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/messages?limit=${limit}&page=${page}`,
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

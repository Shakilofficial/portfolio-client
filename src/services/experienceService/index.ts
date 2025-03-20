/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

export const getAllExperiences = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/experiences?limit=${limit}&page=${page}`,
      {
        next: {
          tags: ["EXPERIENCES"],
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const createExperience = async (experience: any) => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/experiences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(experience),
    });
    revalidateTag("EXPERIENCES");
    return res.json();
  } catch (error: any) {
    return Error(error.message || "Failed to create experience");
  }
};

export const updateExperience = async (experience: any, id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/experiences/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(experience),
      }
    );
    revalidateTag("EXPERIENCES");
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleExperience = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/experiences/${id}`,
      {
        next: {
          tags: ["EXPERIENCES"],
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const deleteExperience = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/experiences/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag("EXPERIENCES");
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

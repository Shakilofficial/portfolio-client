/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { getValidToken } from "@/utils/verifyToken";

export const getMetaData = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/meta`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        revalidate: 10,
      },
    });
    return res.json();
  } catch (error: any) {
    Error(error.message);
  }
};

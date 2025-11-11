"use server";

import { SERVER_BASE_URL } from "@/constants/enums";
import { formatedSerErrRes } from "@/lib/utils";
import { APIResponse, User } from "@/types/types";
import { cookies, headers } from "next/headers";

const endpoint = "/users";

export const getUsers = async (): Promise<APIResponse<User[]>> => {
  try {
    const url = `${SERVER_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      next: { revalidate: 50 },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("error in getUsers", error);
    return formatedSerErrRes("server error", error);
  }
};

export const getUser = async (userId: string): Promise<APIResponse<User>> => {
  try {
    const url = `${SERVER_BASE_URL}${endpoint}/${userId}`;
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("error in getUsers", error);
    return formatedSerErrRes("server error", error);
  }
};

export const getCurrentUser = async (): Promise<APIResponse<User>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${SERVER_BASE_URL}${endpoint}/me`;
    const response = await fetch(url, {
      headers: {
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("error in getUsers", error);
    return formatedSerErrRes("server error", error);
  }
};

export const createUser = async (userData: User): Promise<APIResponse<User>>  => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const bodyToJson = JSON.stringify(userData);
    const url = `${SERVER_BASE_URL}${endpoint}/register`;
    const response = await fetch(url, {
      method: "POST",
      body: bodyToJson,
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const updateUser = async (userData: User, userId: string) => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const bodyToJson = JSON.stringify(userData);
    const url = `${SERVER_BASE_URL}${endpoint}/${userId}`;
    const response = await fetch(url, {
      method: "PATCH",
      body: bodyToJson,
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${SERVER_BASE_URL}${endpoint}/delete/${userId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const logOut = async () =>{
  (await cookies()).delete("TOKEN")
}

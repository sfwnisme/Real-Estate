"use server";

import { SERVER_BASE_URL } from "@/constants/enums";
import { formatedApiErrRes, formatedSerErrRes } from "@/lib/utils";
import { APIResponse, BlogPost, ImageType } from "@/types/types";
import { cookies } from "next/headers";

const endpoint = "/blog-posts";

export const createBlogPost = async (blogPostData: BlogPost): Promise<APIResponse<BlogPost>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const bodyToJson = JSON.stringify(blogPostData);
    const url = `${SERVER_BASE_URL}/${endpoint}/create`;
    const response = await fetch(url, {
      method: "POST",
      body: bodyToJson,
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    if(!response.ok) {
      return formatedApiErrRes(responseData)
    }
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error",error);
  }
};

export const createTempBlogPostImage = async (image: File, tempId: string): Promise<APIResponse<ImageType>> => {
  try {
    const FD = new FormData();
    FD.append("file", image);
    FD.append("tempId", tempId);
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${SERVER_BASE_URL}/images/create-temp-blog-post-image`;
    const response = await fetch(url, {
      method: "POST",
      body: FD,
      headers: {
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    if(!response.ok) {
      return formatedApiErrRes(responseData)
    }
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error",error);
  }
};

export const createBlogPostImage = async (image: File, blogPostId: string): Promise<APIResponse<ImageType>> => {
  try {
    const FD = new FormData();
    FD.append("file", image);
    FD.append("blogPostId", blogPostId);
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${SERVER_BASE_URL}/images/create-blog-post-image`;
    const response = await fetch(url, {
      method: "POST",
      body: FD,
      headers: {
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    if(!response.ok) {
      return formatedApiErrRes(responseData)
    }
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error",error);
  }
};

export const updateBlogPost = async (
  blogPostData: BlogPost,
  blogPostId: string
): Promise<APIResponse<BlogPost>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const bodyToJson = JSON.stringify(blogPostData);
    const url = `${SERVER_BASE_URL}/${endpoint}/${blogPostId}`;
    const response = await fetch(url, {
      method: "PATCH",
      body: bodyToJson,
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    if(!response.ok) {
      return formatedApiErrRes(responseData)
    }
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error",error);
  }
};

export const updateBlogPostSlug = async (blogPostId: string, slug: string): Promise<APIResponse<BlogPost>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const bodyToJson = JSON.stringify({ blogPostId, slug });
    const url = `${SERVER_BASE_URL}/${endpoint}/update-slug`;
    const response = await fetch(url, {
      method: "PATCH",
      body: bodyToJson,
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    if(!response.ok) {
      return formatedApiErrRes(responseData)
    }
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error",error);
  }
};

export const deleteBlogPost = async (blogPostId: string) => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${SERVER_BASE_URL}/${endpoint}/delete/${blogPostId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    if(!response.ok) {
      return formatedApiErrRes(responseData)
    }
    return responseData;
  } catch (error) {
    return error;
  }
};

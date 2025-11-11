"use server";

import { SERVER_BASE_URL } from "@/constants/enums";
import { formatedApiErrRes, formatedSerErrRes } from "@/lib/utils";
import {
  APIResponse,
  ApiSuccessResponse,
  ImageType,
  Property,
} from "@/types/types";
import { cookies, headers } from "next/headers";

// update slug

const endpoint = "/properties";

export const createProperty = async (
  propertyData: Property
): Promise<APIResponse<Property>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const bodyToJson = JSON.stringify(propertyData);
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
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const createTempPropertyImage = async (
  image: File,
  tempId: string
): Promise<APIResponse<ImageType>> => {
  try {
    const FD = new FormData();
    FD.append("file", image);
    FD.append("tempId", tempId);
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${SERVER_BASE_URL}/images/create-temp-property-image`;
    const response = await fetch(url, {
      method: "POST",
      body: FD,
      headers: {
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const createPropertyImage = async (
  image: File,
  propertyId: string
): Promise<APIResponse<ImageType>> => {
  try {
    const FD = new FormData();
    FD.append("file", image);
    FD.append("propertyId", propertyId);
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${SERVER_BASE_URL}/images/create-property-image`;
    const response = await fetch(url, {
      method: "POST",
      body: FD,
      headers: {
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const updateProperty = async (
  propertyData: Property,
  propertyId: string
): Promise<APIResponse<Property>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const bodyToJson = JSON.stringify(propertyData);
    const url = `${SERVER_BASE_URL}/${endpoint}/${propertyId}`;
    const response = await fetch(url, {
      method: "PATCH",
      body: bodyToJson,
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const updatePropertySlug = async (
  propertyId: string,
  slug: string
): Promise<APIResponse<Property>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const bodyToJson = JSON.stringify({ propertyId, slug });
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
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

export const deleteProperty = async (
  propertyId: string
): Promise<APIResponse<null>> => {
  try {
    const token = (await cookies()).get("TOKEN")?.value;
    const url = `${SERVER_BASE_URL}/${endpoint}/delete/${propertyId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      return formatedApiErrRes(responseData);
    }
    return responseData;
  } catch (error) {
    return formatedSerErrRes("server error", error);
  }
};

import { STATUS_TEXT } from "@/constants/enums";
import { ApiErrorResponse } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// for application catch block
export function formatedSerErrRes(msg: string, error: any) {
  return {
    status: 500,
    statusText: STATUS_TEXT.ERROR,
    msg,
    data: null,
    error: error?.message ?? "Unknown clinet error",
  };
}

// for try block
export function formatedApiErrRes(response: ApiErrorResponse) {
  let msg;
  if (Array.isArray(response.msg)) {
    msg = response.msg[0];
  } else if (typeof response.msg !== "string") {
    msg = JSON.stringify(response.msg);
  } else {
    msg = response.msg;
  }

  return {
    status: response.status,
    statusText: response.statusText,
    msg,
    data: null,
    error: JSON.stringify(response.error) ?? "Unknown clinet error",
  };
}

export const modalQuery = (
  type: "delete",
  endpoint: "user" | "property" | "blog" | "image",
  id: string,
  existingParams: Record<string, string | undefined>
) => {
  return {
    query: {
      ...existingParams,
      modal: type,
      endpoint,
      id,
    },
  };
};

export const formatDate = (date: Date, fallback?: string) => {
  if (!date) return fallback;
  const convertDate = new Date(date);
  const format = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(convertDate);
  return format;
};

export const textTrimmer = (text: string, length: number = 20): string => {
  if (text.length < length) {
    return text;
  }
  return `${text.slice(0,length)}...`
};

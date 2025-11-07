import {
  BLOG_POST_STATUS,
  MODELS,
  PROPERTY_STATUS,
  PROPERTY_TYPE,
  STATUS_TEXT,
  USER_ROLES,
} from "@/constants/enums";

export type Property = {
  tempId?: string;
  _id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  propertySize: number;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  garageSize: number;
  yearBuilt: number;
  propertyType: (typeof PROPERTY_TYPE)[keyof typeof PROPERTY_TYPE];
  propertyStatus: (typeof PROPERTY_STATUS)[keyof typeof PROPERTY_STATUS];
  hidde: boolean;
  video: string;
  address: PropertyAddress;
  features?: string;
  createdAt: Date;
  updatedAt: Date;
};
export type PropertyAddress = {
  country: string;
  state: string;
  city: string;
  area: string;
  zipCode: string;
  other: string;
};

type MetadataType = {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
};
export type BlogPost = {
  tempId?: string;
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: (typeof BLOG_POST_STATUS)[keyof typeof BLOG_POST_STATUS];
  meta: MetadataType;
  readingTime: string;
  createdAt: Date;
  updatedAt: Date;
};
export type User = {
  _id: string;
  name: string;
  email: string;
  role: (typeof USER_ROLES)[keyof typeof USER_ROLES];
  token: string;
  createdAt?: Date;
  updatedAt?: Date;
};

// Base pagination wrapper
export type PaginationResponseType<T> = {
  page: number;
  nextPage: number | null;
  prevPage: number | null;
  pageSize: number;
  totalPages: number;
  totalData: number;
  data: T;
};

// The full API response shape (for paginated endpoints)
export type PaginatedApiResponse<T> = {
  status: number;
  statusText: (typeof STATUS_TEXT)[keyof typeof STATUS_TEXT];
  msg: string;
  data: PaginationResponseType<T>;
};

export type ApiResponse<T> = {
  status: number;
  statusText: (typeof STATUS_TEXT)[keyof typeof STATUS_TEXT];
  msg: string;
  data: T;
};
export type ImageType = {
  _id: string;
  url: string;
  fileName: string;
  ownerModel: (typeof MODELS)[keyof typeof MODELS];
  ownerId: string;
  mimeType: string;
  size: number;
  dimensions: {
    width: number;
    height: number;
  };
  isFeatured: boolean;
  isTemp: boolean;
  createdAt: Date;
  updatedAt: Date;
};
// export type PaginationType = {
//   totalData: number;
//   totalPages: number;
//   currentPage: number;
//   nextPage: number;
//   pageLimit: number;
// };

//-----------------------
// CONFIG TYPES
//-----------------------
export type FirebaseAuthErrorCodesTypes =
  | "auth/claims-too-large"
  | "auth/email-already-exists"
  | "auth/id-token-expired"
  | "auth/id-token-revoked"
  | "auth/insufficient-permission"
  | "auth/internal-error"
  | "auth/invalid-argument"
  | "auth/invalid-claims"
  | "auth/invalid-continue-uri"
  | "auth/invalid-creation-time"
  | "auth/invalid-credential"
  | "auth/invalid-disabled-field"
  | "auth/invalid-display-name"
  | "auth/invalid-dynamic-link-domain"
  | "auth/invalid-email"
  | "auth/invalid-email-verified"
  | "auth/invalid-hash-algorithm"
  | "auth/invalid-hash-block-size"
  | "auth/invalid-hash-derived-key-length"
  | "auth/invalid-hash-key"
  | "auth/invalid-hash-memory-cost"
  | "auth/invalid-hash-parallelization"
  | "auth/invalid-hash-rounds"
  | "auth/invalid-hash-salt-separator"
  | "auth/invalid-id-token"
  | "auth/invalid-last-sign-in-time"
  | "auth/invalid-page-token"
  | "auth/invalid-password"
  | "auth/invalid-password-hash"
  | "auth/invalid-password-salt"
  | "auth/invalid-phone-number"
  | "auth/invalid-photo-url"
  | "auth/invalid-provider-data"
  | "auth/invalid-provider-id"
  | "auth/invalid-oauth-responsetype"
  | "auth/invalid-session-cookie-duration"
  | "auth/invalid-uid"
  | "auth/invalid-user-import"
  | "auth/maximum-user-count-exceeded"
  | "auth/missing-android-pkg-name"
  | "auth/missing-continue-uri"
  | "auth/missing-hash-algorithm"
  | "auth/missing-ios-bundle-id"
  | "auth/missing-uid"
  | "auth/missing-oauth-client-secret"
  | "auth/operation-not-allowed"
  | "auth/phone-number-already-exists"
  | "auth/project-not-found"
  | "auth/reserved-claims"
  | "auth/session-cookie-expired"
  | "auth/session-cookie-revoked"
  | "auth/too-many-requests"
  | "auth/uid-already-exists"
  | "auth/unauthorized-continue-uri"
  | "auth/user-disabled"
  | "auth/user-not-found";

export type FirebaseAuthErrorCodesMessage = Record<
  FirebaseAuthErrorCodesTypes,
  string
>;

//----------------------------
// Type Helpers
//----------------------------

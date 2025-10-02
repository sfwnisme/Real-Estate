enum PropertyType {
  Appartment = "appartment",
  Villa = "villa",
  Chalet = "chalet",
  Studio = "studio"
}
export type Property = {
  id: string,
  images: string,
  propertyId: string;
  title: string,
  price: number;
  description: string,
  propertySize: number;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  garageSize: number;
  yearBuilt: number;
  propertyType: 'appartment' | 'villa' | 'chalet' | 'studio';
  propertyStatus: 'for-sale' | 'for-rent' | 'sold' | 'rented';
  address: PropertyAddress;
  features?: string
};
export type PropertyAddress = {
  city: string;
  state: string;
  zipCode: string;
  area: string;
  country: string;
  other: string;
};
export type PaginationType = {
  totalData: number,
  totalPages: number,
  currentPage: number,
  nextPage: number,
  pageLimit: number
}

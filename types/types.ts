export type Property = {
  propertyId: string;
  title: string,
  price: number;
  description: string,
  propertySize: string;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  garageSize: string;
  yearBuilt: number;
  propertyType: string;
  propertyStatus: string;
  additionalDetails: PropertyAdditionalDetails;
  address: PropertyAddress;
  features?: string[]
};
type PropertyAdditionalDetails = {
  deposit: string;
  poolSize: string;
  amenities: string[];
  additionalRooms: string[];
  equipment: string[];
};
export type PropertyAddress = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  area: string;
  country: string;
};
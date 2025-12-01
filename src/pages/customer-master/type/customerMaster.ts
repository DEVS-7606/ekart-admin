export interface CustomerRow {
  name: string;
  code: string;
  shortName: string;
  maxUsers: string;
  language: string;
  description?: string;
  locations: CustomerLocationRow[];
}

export interface CustomerLocationRow {
  locationName: string;
  locationShortName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  timezone: string;
  mobileNo: string;
  email: string;
  longitude: string;
  latitude: string;
  description?: string;
}

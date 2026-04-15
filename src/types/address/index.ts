export interface AddressResponse {
  status: string;
  message?: string;
  data: PersonalDetails;
}

export interface PersonalDetails {
  _id: string;
  name: string;
  phone: number;
  city: string;
  details: string;
}

export interface AddressesResponse {
  status: string;
  message: string;
  data: PersonalDetails[];
}

export interface CreateAddressDTO {
  parent: string;
  default: boolean;
  street: string;
  complement?: string;
  number: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  createdBy: string;
}

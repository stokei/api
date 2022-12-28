export interface CreateAddressDTO {
  parent: string;
  street: string;
  complement?: string;
  number: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  app: string;
  createdBy: string;
}

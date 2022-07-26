export interface UpdateAddressDataDTO {
  updatedBy: string;
  app: string;
  default?: boolean;
  street?: string;
  complement?: string;
  number?: string;
  city?: string;
  country?: string;
  state?: string;
  postalCode?: string;
}

export interface UpdateAddressWhereDTO {
  addressId: string;
}

export interface UpdateAddressDTO {
  data: UpdateAddressDataDTO;
  where: UpdateAddressWhereDTO;
}

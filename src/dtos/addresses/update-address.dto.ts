export interface UpdateAddressDataDTO {
  updatedBy: string;
  street?: string;
  complement?: string;
  number?: string;
  city?: string;
  country?: string;
  state?: string;
  postalCode?: string;
}

export interface UpdateAddressWhereDTO {
  app: string;
  address: string;
}

export interface UpdateAddressDTO {
  data: UpdateAddressDataDTO;
  where: UpdateAddressWhereDTO;
}

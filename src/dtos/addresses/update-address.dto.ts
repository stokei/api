export interface UpdateAddressDataDTO {
  name?: string;
}

export interface UpdateAddressWhereDTO {
  addressId: string;
}

export interface UpdateAddressDTO {
  data: UpdateAddressDataDTO;
  where: UpdateAddressWhereDTO;
}

export interface RemoveAddressWhereDTO {
  removedBy: string;
  addressId: string;
}

export interface RemoveAddressDTO {
  where: RemoveAddressWhereDTO;
}

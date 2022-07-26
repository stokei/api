export interface RemoveAddressWhereDTO {
  removedBy: string;
  app: string;
  addressId: string;
}

export interface RemoveAddressDTO {
  where: RemoveAddressWhereDTO;
}

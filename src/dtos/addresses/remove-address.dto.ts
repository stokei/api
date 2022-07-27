export interface RemoveAddressWhereDTO {
  removedBy: string;
  app: string;
  address: string;
}

export interface RemoveAddressDTO {
  where: RemoveAddressWhereDTO;
}

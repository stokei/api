export interface RemovePhoneWhereDTO {
  removedBy: string;
  app: string;
  phone: string;
}

export interface RemovePhoneDTO {
  where: RemovePhoneWhereDTO;
}

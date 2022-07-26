export interface RemovePhoneWhereDTO {
  removedBy: string;
  app: string;
  phoneId: string;
}

export interface RemovePhoneDTO {
  where: RemovePhoneWhereDTO;
}

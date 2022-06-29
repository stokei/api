export interface RemovePhoneWhereDTO {
  removedBy: string;
  phoneId: string;
}

export interface RemovePhoneDTO {
  where: RemovePhoneWhereDTO;
}

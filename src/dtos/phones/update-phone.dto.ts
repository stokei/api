export interface UpdatePhoneDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdatePhoneWhereDTO {
  phoneId: string;
}

export interface UpdatePhoneDTO {
  data: UpdatePhoneDataDTO;
  where: UpdatePhoneWhereDTO;
}

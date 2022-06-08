export interface UpdateAccessDataDTO {
  name?: string;
}

export interface UpdateAccessWhereDTO {
  accessId: string;
}

export interface UpdateAccessDTO {
  data: UpdateAccessDataDTO;
  where: UpdateAccessWhereDTO;
}

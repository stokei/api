export interface UpdateColorDataDTO {
  updatedBy: string;
  color?: string;
}

export interface UpdateColorWhereDTO {
  app: string;
  color: string;
}

export interface UpdateColorDTO {
  data: UpdateColorDataDTO;
  where: UpdateColorWhereDTO;
}

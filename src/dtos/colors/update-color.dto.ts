export interface UpdateColorDataDTO {
  updatedBy: string;
  color?: string;
}

export interface UpdateColorWhereDTO {
  colorId: string;
}

export interface UpdateColorDTO {
  data: UpdateColorDataDTO;
  where: UpdateColorWhereDTO;
}

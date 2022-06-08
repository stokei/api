export interface UpdateColorDataDTO {
  name?: string;
}

export interface UpdateColorWhereDTO {
  colorId: string;
}

export interface UpdateColorDTO {
  data: UpdateColorDataDTO;
  where: UpdateColorWhereDTO;
}

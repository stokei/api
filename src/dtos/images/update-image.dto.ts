export interface UpdateImageDataDTO {
  name?: string;
}

export interface UpdateImageWhereDTO {
  imageId: string;
}

export interface UpdateImageDTO {
  data: UpdateImageDataDTO;
  where: UpdateImageWhereDTO;
}

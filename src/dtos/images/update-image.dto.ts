export interface UpdateImageDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateImageWhereDTO {
  imageId: string;
}

export interface UpdateImageDTO {
  data: UpdateImageDataDTO;
  where: UpdateImageWhereDTO;
}

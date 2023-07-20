export interface UpdateMaterialDataDTO {
  name?: string;
  file?: string;
  description?: string;
  avatar?: string;
  free?: boolean;
  updatedBy: string;
}

export interface UpdateMaterialWhereDTO {
  app: string;
  material: string;
}

export interface UpdateMaterialDTO {
  data: UpdateMaterialDataDTO;
  where: UpdateMaterialWhereDTO;
}

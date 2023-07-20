export interface RemoveMaterialWhereDTO {
  removedBy: string;
  app: string;
  material: string;
}

export interface RemoveMaterialDTO {
  where: RemoveMaterialWhereDTO;
}

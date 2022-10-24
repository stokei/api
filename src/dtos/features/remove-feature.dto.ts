export interface RemoveFeatureWhereDTO {
  removedBy: string;
  app: string;
  feature: string;
}

export interface RemoveFeatureDTO {
  where: RemoveFeatureWhereDTO;
}

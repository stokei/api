export interface UpdateFeatureDataDTO {
  name?: string;
  description?: string;
  updatedBy: string;
}

export interface UpdateFeatureWhereDTO {
  app: string;
  feature: string;
}

export interface UpdateFeatureDTO {
  data: UpdateFeatureDataDTO;
  where: UpdateFeatureWhereDTO;
}

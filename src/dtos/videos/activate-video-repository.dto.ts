export interface ActivateVideoRepositoryDataDTO {
  active: boolean;
  updatedBy: string;
}

export interface ActivateVideoRepositoryWhereDTO {
  app: string;
  video: string;
}

export interface ActivateVideoRepositoryDTO {
  data: ActivateVideoRepositoryDataDTO;
  where: ActivateVideoRepositoryWhereDTO;
}

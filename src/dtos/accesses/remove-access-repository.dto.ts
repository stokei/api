export interface RemoveAccessRepositoryWhereDTO {
  access: string;
}
export interface RemoveAccessRepositoryDataDTO {
  active: boolean;
  updatedBy: string;
  expiresIn: string;
  canceledAt: string;
}

export interface RemoveAccessRepositoryDTO {
  where: RemoveAccessRepositoryWhereDTO;
  data: RemoveAccessRepositoryDataDTO;
}

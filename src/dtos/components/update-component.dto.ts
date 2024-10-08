export interface UpdateComponentDataDTO {
  parent?: string;
  order?: number;
  data?: any;
  updatedBy: string;
}

export interface UpdateComponentWhereDTO {
  app: string;
  component: string;
}

export interface UpdateComponentDTO {
  data: UpdateComponentDataDTO;
  where: UpdateComponentWhereDTO;
}

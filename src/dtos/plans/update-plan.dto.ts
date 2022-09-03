export interface UpdatePlanDataDTO {
  product?: string;
  price?: string;
  updatedBy: string;
}

export interface UpdatePlanWhereDTO {
  plan: string;
}

export interface UpdatePlanDTO {
  data: UpdatePlanDataDTO;
  where: UpdatePlanWhereDTO;
}

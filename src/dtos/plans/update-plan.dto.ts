export interface UpdatePlanDataDTO {
  name?: string;
  description?: string;
  updatedBy: string;
}

export interface UpdatePlanWhereDTO {
  plan: string;
}

export interface UpdatePlanDTO {
  data: UpdatePlanDataDTO;
  where: UpdatePlanWhereDTO;
}

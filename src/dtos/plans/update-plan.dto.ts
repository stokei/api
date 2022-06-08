export interface UpdatePlanDataDTO {
  name?: string;
}

export interface UpdatePlanWhereDTO {
  planId: string;
}

export interface UpdatePlanDTO {
  data: UpdatePlanDataDTO;
  where: UpdatePlanWhereDTO;
}

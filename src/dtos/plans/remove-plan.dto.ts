export interface RemovePlanWhereDTO {
  removedBy: string;
  planId: string;
}

export interface RemovePlanDTO {
  where: RemovePlanWhereDTO;
}

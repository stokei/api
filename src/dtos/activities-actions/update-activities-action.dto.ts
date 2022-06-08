export interface UpdateActivitiesActionDataDTO {
  name?: string;
}

export interface UpdateActivitiesActionWhereDTO {
  activitiesActionId: string;
}

export interface UpdateActivitiesActionDTO {
  data: UpdateActivitiesActionDataDTO;
  where: UpdateActivitiesActionWhereDTO;
}

export interface UpdateActivityDataDTO {
  name?: string;
}

export interface UpdateActivityWhereDTO {
  activityId: string;
}

export interface UpdateActivityDTO {
  data: UpdateActivityDataDTO;
  where: UpdateActivityWhereDTO;
}

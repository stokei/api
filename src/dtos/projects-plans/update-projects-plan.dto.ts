export interface UpdateProjectsPlanDataDTO {
  name?: string;
}

export interface UpdateProjectsPlanWhereDTO {
  projectsPlanId: string;
}

export interface UpdateProjectsPlanDTO {
  data: UpdateProjectsPlanDataDTO;
  where: UpdateProjectsPlanWhereDTO;
}

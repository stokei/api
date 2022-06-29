export interface UpdateProjectDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateProjectWhereDTO {
  projectId: string;
}

export interface UpdateProjectDTO {
  data: UpdateProjectDataDTO;
  where: UpdateProjectWhereDTO;
}

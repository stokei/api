export interface UpdateProjectDataDTO {
  name?: string;
  slug?: string;
  description?: string;
  avatar?: string;
  plan?: string;
  favicon?: string;
  logo?: string;
  updatedBy: string;
}

export interface UpdateProjectWhereDTO {
  projectId: string;
}

export interface UpdateProjectDTO {
  data: UpdateProjectDataDTO;
  where: UpdateProjectWhereDTO;
}

export interface UpdateCourseDataDTO {
  updatedBy: string;
  name?: string;
  description?: string;
  avatar?: string;
}

export interface UpdateCourseWhereDTO {
  app: string;
  course: string;
  parent: string;
}

export interface UpdateCourseDTO {
  data: UpdateCourseDataDTO;
  where: UpdateCourseWhereDTO;
}

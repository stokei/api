export interface UpdateCourseDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateCourseWhereDTO {
  courseId: string;
}

export interface UpdateCourseDTO {
  data: UpdateCourseDataDTO;
  where: UpdateCourseWhereDTO;
}

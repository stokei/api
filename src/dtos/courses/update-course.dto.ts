export interface UpdateCourseDataDTO {
  name?: string;
}

export interface UpdateCourseWhereDTO {
  courseId: string;
}

export interface UpdateCourseDTO {
  data: UpdateCourseDataDTO;
  where: UpdateCourseWhereDTO;
}

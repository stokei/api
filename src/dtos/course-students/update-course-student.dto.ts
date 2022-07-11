export interface UpdateCourseStudentDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateCourseStudentWhereDTO {
  courseStudentId: string;
}

export interface UpdateCourseStudentDTO {
  data: UpdateCourseStudentDataDTO;
  where: UpdateCourseStudentWhereDTO;
}

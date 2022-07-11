export interface UpdateCourseInstructorDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateCourseInstructorWhereDTO {
  courseInstructorId: string;
}

export interface UpdateCourseInstructorDTO {
  data: UpdateCourseInstructorDataDTO;
  where: UpdateCourseInstructorWhereDTO;
}

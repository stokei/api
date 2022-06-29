export interface UpdateCoursesStudentDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateCoursesStudentWhereDTO {
  coursesStudentId: string;
}

export interface UpdateCoursesStudentDTO {
  data: UpdateCoursesStudentDataDTO;
  where: UpdateCoursesStudentWhereDTO;
}

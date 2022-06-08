export interface UpdateCoursesStudentDataDTO {
  name?: string;
}

export interface UpdateCoursesStudentWhereDTO {
  coursesStudentId: string;
}

export interface UpdateCoursesStudentDTO {
  data: UpdateCoursesStudentDataDTO;
  where: UpdateCoursesStudentWhereDTO;
}

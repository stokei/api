export interface RemoveCoursesStudentWhereDTO {
  removedBy: string;
  coursesStudentId: string;
}

export interface RemoveCoursesStudentDTO {
  where: RemoveCoursesStudentWhereDTO;
}

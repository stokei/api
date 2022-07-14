export interface RemoveCourseStudentWhereDTO {
  removedBy: string;
  course: string;
  student: string;
}

export interface RemoveCourseStudentDTO {
  where: RemoveCourseStudentWhereDTO;
}

export interface RemoveCourseStudentWhereDTO {
  removedBy: string;
  app: string;
  course: string;
  student: string;
}

export interface RemoveCourseStudentDTO {
  where: RemoveCourseStudentWhereDTO;
}

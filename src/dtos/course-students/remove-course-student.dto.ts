export interface RemoveCourseStudentWhereDTO {
  removedBy: string;
  courseStudentId: string;
}

export interface RemoveCourseStudentDTO {
  where: RemoveCourseStudentWhereDTO;
}

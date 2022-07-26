export interface RemoveCourseInstructorWhereDTO {
  removedBy: string;
  app: string;
  course: string;
  instructor: string;
}

export interface RemoveCourseInstructorDTO {
  where: RemoveCourseInstructorWhereDTO;
}

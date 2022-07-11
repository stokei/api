export interface RemoveCourseInstructorWhereDTO {
  removedBy: string;
  courseInstructorId: string;
}

export interface RemoveCourseInstructorDTO {
  where: RemoveCourseInstructorWhereDTO;
}

export interface RemoveCourseInstructorWhereDTO {
  removedBy: string;
  course: string;
  instructor: string;
}

export interface RemoveCourseInstructorDTO {
  where: RemoveCourseInstructorWhereDTO;
}

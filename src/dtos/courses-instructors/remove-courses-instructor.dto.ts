export interface RemoveCoursesInstructorWhereDTO {
  removedBy: string;
  coursesInstructorId: string;
}

export interface RemoveCoursesInstructorDTO {
  where: RemoveCoursesInstructorWhereDTO;
}

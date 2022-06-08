export interface UpdateCoursesInstructorDataDTO {
  name?: string;
}

export interface UpdateCoursesInstructorWhereDTO {
  coursesInstructorId: string;
}

export interface UpdateCoursesInstructorDTO {
  data: UpdateCoursesInstructorDataDTO;
  where: UpdateCoursesInstructorWhereDTO;
}

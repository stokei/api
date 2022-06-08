export interface UpdateCoursesAdminDataDTO {
  name?: string;
}

export interface UpdateCoursesAdminWhereDTO {
  coursesAdminId: string;
}

export interface UpdateCoursesAdminDTO {
  data: UpdateCoursesAdminDataDTO;
  where: UpdateCoursesAdminWhereDTO;
}

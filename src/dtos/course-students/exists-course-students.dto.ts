export interface ExistsCourseStudentsWhereDTO {
  course?: string;
  student?: string;
}

export interface ExistsCourseStudentsDTO {
  where: ExistsCourseStudentsWhereDTO;
}

export interface ExistsCourseInstructorsWhereDTO {
  course?: string;
  instructor?: string;
}

export interface ExistsCourseInstructorsDTO {
  where: ExistsCourseInstructorsWhereDTO;
}

export interface ExistsClassroomStudentsWhereDTO {
  classroom?: string;
  student?: string;
}

export interface ExistsClassroomStudentsDTO {
  where: ExistsClassroomStudentsWhereDTO;
}

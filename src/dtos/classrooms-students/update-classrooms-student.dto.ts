export interface UpdateClassroomsStudentDataDTO {
  name?: string;
}

export interface UpdateClassroomsStudentWhereDTO {
  classroomsStudentId: string;
}

export interface UpdateClassroomsStudentDTO {
  data: UpdateClassroomsStudentDataDTO;
  where: UpdateClassroomsStudentWhereDTO;
}

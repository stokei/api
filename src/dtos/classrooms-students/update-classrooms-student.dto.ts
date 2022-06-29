export interface UpdateClassroomsStudentDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateClassroomsStudentWhereDTO {
  classroomsStudentId: string;
}

export interface UpdateClassroomsStudentDTO {
  data: UpdateClassroomsStudentDataDTO;
  where: UpdateClassroomsStudentWhereDTO;
}

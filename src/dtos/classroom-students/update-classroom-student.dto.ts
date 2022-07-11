export interface UpdateClassroomStudentDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateClassroomStudentWhereDTO {
  classroomStudentId: string;
}

export interface UpdateClassroomStudentDTO {
  data: UpdateClassroomStudentDataDTO;
  where: UpdateClassroomStudentWhereDTO;
}

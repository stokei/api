export interface UpdateClassroomDataDTO {
  updatedBy: string;
  name?: string;
  description?: string;
}

export interface UpdateClassroomWhereDTO {
  classroomId: string;
}

export interface UpdateClassroomDTO {
  data: UpdateClassroomDataDTO;
  where: UpdateClassroomWhereDTO;
}

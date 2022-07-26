export interface UpdateClassroomDataDTO {
  updatedBy: string;
  app: string;
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

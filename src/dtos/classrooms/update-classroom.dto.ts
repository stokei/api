export interface UpdateClassroomDataDTO {
  updatedBy: string;
  name?: string;
  description?: string;
}

export interface UpdateClassroomWhereDTO {
  app: string;
  classroom: string;
}

export interface UpdateClassroomDTO {
  data: UpdateClassroomDataDTO;
  where: UpdateClassroomWhereDTO;
}

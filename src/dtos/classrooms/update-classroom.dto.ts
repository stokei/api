export interface UpdateClassroomDataDTO {
  name?: string;
}

export interface UpdateClassroomWhereDTO {
  classroomId: string;
}

export interface UpdateClassroomDTO {
  data: UpdateClassroomDataDTO;
  where: UpdateClassroomWhereDTO;
}

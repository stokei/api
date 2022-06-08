export interface UpdateClassroomsMaterialDataDTO {
  name?: string;
}

export interface UpdateClassroomsMaterialWhereDTO {
  classroomsMaterialId: string;
}

export interface UpdateClassroomsMaterialDTO {
  data: UpdateClassroomsMaterialDataDTO;
  where: UpdateClassroomsMaterialWhereDTO;
}

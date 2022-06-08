export interface UpdateClassroomsModuleDataDTO {
  name?: string;
}

export interface UpdateClassroomsModuleWhereDTO {
  classroomsModuleId: string;
}

export interface UpdateClassroomsModuleDTO {
  data: UpdateClassroomsModuleDataDTO;
  where: UpdateClassroomsModuleWhereDTO;
}

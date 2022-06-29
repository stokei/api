export interface UpdateClassroomsModuleDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateClassroomsModuleWhereDTO {
  classroomsModuleId: string;
}

export interface UpdateClassroomsModuleDTO {
  data: UpdateClassroomsModuleDataDTO;
  where: UpdateClassroomsModuleWhereDTO;
}

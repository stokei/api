export interface UpdateClassroomModuleDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateClassroomModuleWhereDTO {
  classroomModuleId: string;
}

export interface UpdateClassroomModuleDTO {
  data: UpdateClassroomModuleDataDTO;
  where: UpdateClassroomModuleWhereDTO;
}

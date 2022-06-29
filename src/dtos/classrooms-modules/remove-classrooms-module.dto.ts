export interface RemoveClassroomsModuleWhereDTO {
  removedBy: string;
  classroomsModuleId: string;
}

export interface RemoveClassroomsModuleDTO {
  where: RemoveClassroomsModuleWhereDTO;
}

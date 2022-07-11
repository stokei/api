export interface RemoveClassroomModuleWhereDTO {
  removedBy: string;
  classroomModuleId: string;
}

export interface RemoveClassroomModuleDTO {
  where: RemoveClassroomModuleWhereDTO;
}

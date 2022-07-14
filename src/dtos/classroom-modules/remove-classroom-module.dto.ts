export interface RemoveClassroomModuleWhereDTO {
  removedBy: string;
  classroom: string;
  module: string;
}

export interface RemoveClassroomModuleDTO {
  where: RemoveClassroomModuleWhereDTO;
}

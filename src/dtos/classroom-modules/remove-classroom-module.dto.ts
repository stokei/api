export interface RemoveClassroomModuleWhereDTO {
  removedBy: string;
  app: string;
  classroom: string;
  module: string;
}

export interface RemoveClassroomModuleDTO {
  where: RemoveClassroomModuleWhereDTO;
}

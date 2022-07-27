export interface RemoveClassroomWhereDTO {
  removedBy: string;
  app: string;
  classroom: string;
}

export interface RemoveClassroomDTO {
  where: RemoveClassroomWhereDTO;
}

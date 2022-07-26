export interface RemoveClassroomWhereDTO {
  removedBy: string;
  app: string;
  classroomId: string;
}

export interface RemoveClassroomDTO {
  where: RemoveClassroomWhereDTO;
}

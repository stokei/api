export interface RemoveClassroomWhereDTO {
  removedBy: string;
  classroomId: string;
}

export interface RemoveClassroomDTO {
  where: RemoveClassroomWhereDTO;
}

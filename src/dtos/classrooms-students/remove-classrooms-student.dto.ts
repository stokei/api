export interface RemoveClassroomsStudentWhereDTO {
  removedBy: string;
  classroomsStudentId: string;
}

export interface RemoveClassroomsStudentDTO {
  where: RemoveClassroomsStudentWhereDTO;
}

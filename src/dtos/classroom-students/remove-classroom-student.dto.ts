export interface RemoveClassroomStudentWhereDTO {
  removedBy: string;
  classroomStudentId: string;
}

export interface RemoveClassroomStudentDTO {
  where: RemoveClassroomStudentWhereDTO;
}

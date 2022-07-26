export interface RemoveClassroomStudentWhereDTO {
  removedBy: string;
  app: string;
  classroom: string;
  student: string;
}

export interface RemoveClassroomStudentDTO {
  where: RemoveClassroomStudentWhereDTO;
}

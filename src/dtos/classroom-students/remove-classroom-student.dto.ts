export interface RemoveClassroomStudentWhereDTO {
  removedBy: string;
  classroom: string;
  student: string;
}

export interface RemoveClassroomStudentDTO {
  where: RemoveClassroomStudentWhereDTO;
}

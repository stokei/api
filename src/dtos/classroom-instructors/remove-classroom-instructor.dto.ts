export interface RemoveClassroomInstructorWhereDTO {
  removedBy: string;
  app: string;
  classroom: string;
  instructor: string;
}

export interface RemoveClassroomInstructorDTO {
  where: RemoveClassroomInstructorWhereDTO;
}

export interface RemoveClassroomInstructorWhereDTO {
  removedBy: string;
  classroom: string;
  instructor: string;
}

export interface RemoveClassroomInstructorDTO {
  where: RemoveClassroomInstructorWhereDTO;
}

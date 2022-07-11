export interface RemoveClassroomInstructorWhereDTO {
  removedBy: string;
  classroomInstructorId: string;
}

export interface RemoveClassroomInstructorDTO {
  where: RemoveClassroomInstructorWhereDTO;
}

export interface UpdateClassroomInstructorDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateClassroomInstructorWhereDTO {
  classroomInstructorId: string;
}

export interface UpdateClassroomInstructorDTO {
  data: UpdateClassroomInstructorDataDTO;
  where: UpdateClassroomInstructorWhereDTO;
}

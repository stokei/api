export interface UpdateClassroomsInstructorDataDTO {
  name?: string;
}

export interface UpdateClassroomsInstructorWhereDTO {
  classroomsInstructorId: string;
}

export interface UpdateClassroomsInstructorDTO {
  data: UpdateClassroomsInstructorDataDTO;
  where: UpdateClassroomsInstructorWhereDTO;
}

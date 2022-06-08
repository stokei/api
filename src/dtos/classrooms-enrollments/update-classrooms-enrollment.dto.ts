export interface UpdateClassroomsEnrollmentDataDTO {
  name?: string;
}

export interface UpdateClassroomsEnrollmentWhereDTO {
  classroomsEnrollmentId: string;
}

export interface UpdateClassroomsEnrollmentDTO {
  data: UpdateClassroomsEnrollmentDataDTO;
  where: UpdateClassroomsEnrollmentWhereDTO;
}

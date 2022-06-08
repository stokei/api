export interface UpdateClassroomsAdminDataDTO {
  name?: string;
}

export interface UpdateClassroomsAdminWhereDTO {
  classroomsAdminId: string;
}

export interface UpdateClassroomsAdminDTO {
  data: UpdateClassroomsAdminDataDTO;
  where: UpdateClassroomsAdminWhereDTO;
}

export interface UpdateClassroomsTagDataDTO {
  name?: string;
}

export interface UpdateClassroomsTagWhereDTO {
  classroomsTagId: string;
}

export interface UpdateClassroomsTagDTO {
  data: UpdateClassroomsTagDataDTO;
  where: UpdateClassroomsTagWhereDTO;
}

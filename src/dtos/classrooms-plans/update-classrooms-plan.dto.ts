export interface UpdateClassroomsPlanDataDTO {
  name?: string;
}

export interface UpdateClassroomsPlanWhereDTO {
  classroomsPlanId: string;
}

export interface UpdateClassroomsPlanDTO {
  data: UpdateClassroomsPlanDataDTO;
  where: UpdateClassroomsPlanWhereDTO;
}

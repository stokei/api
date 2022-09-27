export interface ActivateClassroomWhereDTO {
  updatedBy: string;
  app: string;
  classroom: string;
}

export interface ActivateClassroomDTO {
  where: ActivateClassroomWhereDTO;
}

export interface DeactivateClassroomWhereDTO {
  updatedBy: string;
  app: string;
  classroom: string;
}

export interface DeactivateClassroomDTO {
  where: DeactivateClassroomWhereDTO;
}

export interface RemoveAppInstructorWhereDTO {
  removedBy: string;
  app: string;
  instructor: string;
}

export interface RemoveAppInstructorDTO {
  where: RemoveAppInstructorWhereDTO;
}

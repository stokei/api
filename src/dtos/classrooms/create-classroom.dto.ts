export interface CreateClassroomDTO {
  name: string;
  parent: string;
  description?: string;
  hasAccessToAllModules?: boolean;
  app: string;
  createdBy: string;
}

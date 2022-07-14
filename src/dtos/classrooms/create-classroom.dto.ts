export interface CreateClassroomDTO {
  name: string;
  parent: string;
  description?: string;
  hasAccessToAllModules?: boolean;
  createdBy: string;
}

export interface CreateCourseDTO {
  name: string;
  parent: string;
  description?: string;
  avatar?: string;
  app: string;
  createdBy: string;
}

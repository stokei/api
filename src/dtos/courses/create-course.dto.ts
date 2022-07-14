export interface CreateCourseDTO {
  name: string;
  parent: string;
  description?: string;
  avatar?: string;
  createdBy: string;
}

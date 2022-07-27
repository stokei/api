export interface RemoveCourseWhereDTO {
  removedBy: string;
  app: string;
  course: string;
  parent: string;
}

export interface RemoveCourseDTO {
  where: RemoveCourseWhereDTO;
}

export interface RemoveCourseWhereDTO {
  removedBy: string;
  app: string;
  courseId: string;
  parent: string;
}

export interface RemoveCourseDTO {
  where: RemoveCourseWhereDTO;
}

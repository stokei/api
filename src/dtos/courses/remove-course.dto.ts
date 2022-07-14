export interface RemoveCourseWhereDTO {
  removedBy: string;
  courseId: string;
  parent: string;
}

export interface RemoveCourseDTO {
  where: RemoveCourseWhereDTO;
}

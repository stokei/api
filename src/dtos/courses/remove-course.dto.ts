export interface RemoveCourseWhereDTO {
  removedBy: string;
  courseId: string;
}

export interface RemoveCourseDTO {
  where: RemoveCourseWhereDTO;
}

import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllCourseStudentsService } from '@/services/course-students/find-all-course-students';

@Injectable({ scope: Scope.REQUEST })
export class CourseStudentsLoader {
  constructor(
    private readonly courseStudentsService: FindAllCourseStudentsService
  ) {}

  readonly findByIds = new DataLoader(async (courseStudentIds: string[]) => {
    const courseStudents = await this.courseStudentsService.execute({
      where: {
        AND: {
          ids: courseStudentIds
        }
      }
    });
    const courseStudentsMap = new Map(
      courseStudents?.items?.map((courseStudent) => [
        courseStudent.id,
        courseStudent
      ])
    );
    return courseStudentIds.map((courseStudentId) =>
      courseStudentsMap.get(courseStudentId)
    );
  });
}

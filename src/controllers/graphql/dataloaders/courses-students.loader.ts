import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllCoursesStudentsService } from '@/services/courses-students/find-all-courses-students';

@Injectable({ scope: Scope.REQUEST })
export class CoursesStudentsLoader {
  constructor(
    private readonly coursesStudentsService: FindAllCoursesStudentsService
  ) {}

  readonly findByIds = new DataLoader(async (coursesStudentIds: string[]) => {
    const coursesStudents = await this.coursesStudentsService.execute({
      where: {
        AND: {
          ids: coursesStudentIds
        }
      }
    });
    const coursesStudentsMap = new Map(
      coursesStudents?.items?.map((coursesStudent) => [
        coursesStudent.id,
        coursesStudent
      ])
    );
    return coursesStudentIds.map((coursesStudentId) =>
      coursesStudentsMap.get(coursesStudentId)
    );
  });
}

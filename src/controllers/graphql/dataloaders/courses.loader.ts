import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllCoursesService } from '@/services/courses/find-all-courses';

@Injectable({ scope: Scope.REQUEST })
export class CoursesLoader {
  constructor(private readonly coursesService: FindAllCoursesService) {}

  readonly findByIds = new DataLoader(async (courseIds: string[]) => {
    const courses = await this.coursesService.execute({
      where: {
        AND: {
          ids: courseIds
        }
      }
    });
    const coursesMap = new Map(
      courses?.items?.map((course) => [course.id, course])
    );
    return courseIds.map((courseId) => coursesMap.get(courseId));
  });
}

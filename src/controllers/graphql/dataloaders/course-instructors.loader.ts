import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllCourseInstructorsService } from '@/services/course-instructors/find-all-course-instructors';

@Injectable({ scope: Scope.REQUEST })
export class CourseInstructorsLoader {
  constructor(
    private readonly courseInstructorsService: FindAllCourseInstructorsService
  ) {}

  readonly findByIds = new DataLoader(async (courseInstructorIds: string[]) => {
    const courseInstructors = await this.courseInstructorsService.execute({
      where: {
        AND: {
          ids: courseInstructorIds
        }
      }
    });
    const courseInstructorsMap = new Map(
      courseInstructors?.items?.map((courseInstructor) => [
        courseInstructor.id,
        courseInstructor
      ])
    );
    return courseInstructorIds.map((courseInstructorId) =>
      courseInstructorsMap.get(courseInstructorId)
    );
  });
}

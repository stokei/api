import { Injectable, Scope } from '@nestjs/common';
import { FindAllCoursesInstructorsService } from '@/services/courses-instructors/find-all-courses-instructors';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class CoursesInstructorsLoader {
  constructor(
    private readonly coursesInstructorsService: FindAllCoursesInstructorsService
  ) {}

  readonly findByIds = new DataLoader(
    async (coursesInstructorIds: string[]) => {
      const coursesInstructors = await this.coursesInstructorsService.execute({
        where: {
          AND: {
            ids: coursesInstructorIds
          }
        }
      });
      const coursesInstructorsMap = new Map(
        coursesInstructors?.items?.map((coursesInstructor) => [
          coursesInstructor.id,
          coursesInstructor
        ])
      );
      return coursesInstructorIds.map((coursesInstructorId) =>
        coursesInstructorsMap.get(coursesInstructorId)
      );
    }
  );
}

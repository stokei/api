import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllClassroomInstructorsService } from '@/services/classroom-instructors/find-all-classroom-instructors';

@Injectable({ scope: Scope.REQUEST })
export class ClassroomInstructorsLoader {
  constructor(
    private readonly classroomInstructorsService: FindAllClassroomInstructorsService
  ) {}

  readonly findByIds = new DataLoader(
    async (classroomInstructorIds: string[]) => {
      const classroomInstructors =
        await this.classroomInstructorsService.execute({
          where: {
            AND: {
              ids: classroomInstructorIds
            }
          }
        });
      const classroomInstructorsMap = new Map(
        classroomInstructors?.items?.map((classroomInstructor) => [
          classroomInstructor.id,
          classroomInstructor
        ])
      );
      return classroomInstructorIds.map((classroomInstructorId) =>
        classroomInstructorsMap.get(classroomInstructorId)
      );
    }
  );
}

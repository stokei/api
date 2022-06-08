import { Injectable, Scope } from '@nestjs/common';
import { FindAllClassroomsInstructorsService } from '@/services/classrooms-instructors/find-all-classrooms-instructors';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ClassroomsInstructorsLoader {
  constructor(
    private readonly classroomsInstructorsService: FindAllClassroomsInstructorsService
  ) {}

  readonly findByIds = new DataLoader(
    async (classroomsInstructorIds: string[]) => {
      const classroomsInstructors =
        await this.classroomsInstructorsService.execute({
          where: {
            AND: {
              ids: classroomsInstructorIds
            }
          }
        });
      const classroomsInstructorsMap = new Map(
        classroomsInstructors?.items?.map((classroomsInstructor) => [
          classroomsInstructor.id,
          classroomsInstructor
        ])
      );
      return classroomsInstructorIds.map((classroomsInstructorId) =>
        classroomsInstructorsMap.get(classroomsInstructorId)
      );
    }
  );
}

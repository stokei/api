import { Injectable, Scope } from '@nestjs/common';
import { FindAllClassroomsEnrollmentsService } from '@/services/classrooms-enrollments/find-all-classrooms-enrollments';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ClassroomsEnrollmentsLoader {
  constructor(
    private readonly classroomsEnrollmentsService: FindAllClassroomsEnrollmentsService
  ) {}

  readonly findByIds = new DataLoader(
    async (classroomsEnrollmentIds: string[]) => {
      const classroomsEnrollments =
        await this.classroomsEnrollmentsService.execute({
          where: {
            AND: {
              ids: classroomsEnrollmentIds
            }
          }
        });
      const classroomsEnrollmentsMap = new Map(
        classroomsEnrollments?.items?.map((classroomsEnrollment) => [
          classroomsEnrollment.id,
          classroomsEnrollment
        ])
      );
      return classroomsEnrollmentIds.map((classroomsEnrollmentId) =>
        classroomsEnrollmentsMap.get(classroomsEnrollmentId)
      );
    }
  );
}

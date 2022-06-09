import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllClassroomsPlansService } from '@/services/classrooms-plans/find-all-classrooms-plans';

@Injectable({ scope: Scope.REQUEST })
export class ClassroomsPlansLoader {
  constructor(
    private readonly classroomsPlansService: FindAllClassroomsPlansService
  ) {}

  readonly findByIds = new DataLoader(async (classroomsPlanIds: string[]) => {
    const classroomsPlans = await this.classroomsPlansService.execute({
      where: {
        AND: {
          ids: classroomsPlanIds
        }
      }
    });
    const classroomsPlansMap = new Map(
      classroomsPlans?.items?.map((classroomsPlan) => [
        classroomsPlan.id,
        classroomsPlan
      ])
    );
    return classroomsPlanIds.map((classroomsPlanId) =>
      classroomsPlansMap.get(classroomsPlanId)
    );
  });
}

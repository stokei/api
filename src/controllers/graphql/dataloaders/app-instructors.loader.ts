import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllAppInstructorsService } from '@/services/app-instructors/find-all-app-instructors';

@Injectable({ scope: Scope.REQUEST })
export class AppInstructorsLoader {
  constructor(
    private readonly appInstructorsService: FindAllAppInstructorsService
  ) {}

  readonly findByIds = new DataLoader(async (appInstructorIds: string[]) => {
    const appInstructors = await this.appInstructorsService.execute({
      where: {
        AND: {
          ids: appInstructorIds
        }
      }
    });
    const appInstructorsMap = new Map(
      appInstructors?.items?.map((appInstructor) => [
        appInstructor.id,
        appInstructor
      ])
    );
    return appInstructorIds.map((appInstructorId) =>
      appInstructorsMap.get(appInstructorId)
    );
  });
}

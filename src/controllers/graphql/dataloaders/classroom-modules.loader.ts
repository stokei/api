import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllClassroomModulesService } from '@/services/classroom-modules/find-all-classroom-modules';

@Injectable({ scope: Scope.REQUEST })
export class ClassroomModulesLoader {
  constructor(
    private readonly classroomModulesService: FindAllClassroomModulesService
  ) {}

  readonly findByIds = new DataLoader(async (classroomModuleIds: string[]) => {
    const classroomModules = await this.classroomModulesService.execute({
      where: {
        AND: {
          ids: classroomModuleIds
        }
      }
    });
    const classroomModulesMap = new Map(
      classroomModules?.items?.map((classroomModule) => [
        classroomModule.id,
        classroomModule
      ])
    );
    return classroomModuleIds.map((classroomModuleId) =>
      classroomModulesMap.get(classroomModuleId)
    );
  });
}

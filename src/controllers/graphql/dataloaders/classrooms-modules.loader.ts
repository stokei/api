import { Injectable, Scope } from '@nestjs/common';
import { FindAllClassroomsModulesService } from '@/services/classrooms-modules/find-all-classrooms-modules';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ClassroomsModulesLoader {
  constructor(
    private readonly classroomsModulesService: FindAllClassroomsModulesService
  ) {}

  readonly findByIds = new DataLoader(async (classroomsModuleIds: string[]) => {
    const classroomsModules = await this.classroomsModulesService.execute({
      where: {
        AND: {
          ids: classroomsModuleIds
        }
      }
    });
    const classroomsModulesMap = new Map(
      classroomsModules?.items?.map((classroomsModule) => [
        classroomsModule.id,
        classroomsModule
      ])
    );
    return classroomsModuleIds.map((classroomsModuleId) =>
      classroomsModulesMap.get(classroomsModuleId)
    );
  });
}

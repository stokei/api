import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllClassroomsMaterialsService } from '@/services/classrooms-materials/find-all-classrooms-materials';

@Injectable({ scope: Scope.REQUEST })
export class ClassroomsMaterialsLoader {
  constructor(
    private readonly classroomsMaterialsService: FindAllClassroomsMaterialsService
  ) {}

  readonly findByIds = new DataLoader(
    async (classroomsMaterialIds: string[]) => {
      const classroomsMaterials = await this.classroomsMaterialsService.execute(
        {
          where: {
            AND: {
              ids: classroomsMaterialIds
            }
          }
        }
      );
      const classroomsMaterialsMap = new Map(
        classroomsMaterials?.items?.map((classroomsMaterial) => [
          classroomsMaterial.id,
          classroomsMaterial
        ])
      );
      return classroomsMaterialIds.map((classroomsMaterialId) =>
        classroomsMaterialsMap.get(classroomsMaterialId)
      );
    }
  );
}

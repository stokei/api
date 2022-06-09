import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllClassroomsAdminsService } from '@/services/classrooms-admins/find-all-classrooms-admins';

@Injectable({ scope: Scope.REQUEST })
export class ClassroomsAdminsLoader {
  constructor(
    private readonly classroomsAdminsService: FindAllClassroomsAdminsService
  ) {}

  readonly findByIds = new DataLoader(async (classroomsAdminIds: string[]) => {
    const classroomsAdmins = await this.classroomsAdminsService.execute({
      where: {
        AND: {
          ids: classroomsAdminIds
        }
      }
    });
    const classroomsAdminsMap = new Map(
      classroomsAdmins?.items?.map((classroomsAdmin) => [
        classroomsAdmin.id,
        classroomsAdmin
      ])
    );
    return classroomsAdminIds.map((classroomsAdminId) =>
      classroomsAdminsMap.get(classroomsAdminId)
    );
  });
}

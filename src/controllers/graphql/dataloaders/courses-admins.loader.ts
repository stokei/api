import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllCoursesAdminsService } from '@/services/courses-admins/find-all-courses-admins';

@Injectable({ scope: Scope.REQUEST })
export class CoursesAdminsLoader {
  constructor(
    private readonly coursesAdminsService: FindAllCoursesAdminsService
  ) {}

  readonly findByIds = new DataLoader(async (coursesAdminIds: string[]) => {
    const coursesAdmins = await this.coursesAdminsService.execute({
      where: {
        AND: {
          ids: coursesAdminIds
        }
      }
    });
    const coursesAdminsMap = new Map(
      coursesAdmins?.items?.map((coursesAdmin) => [
        coursesAdmin.id,
        coursesAdmin
      ])
    );
    return coursesAdminIds.map((coursesAdminId) =>
      coursesAdminsMap.get(coursesAdminId)
    );
  });
}

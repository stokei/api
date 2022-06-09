import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllCoursesAdminsDTO } from '@/dtos/courses-admins/find-all-courses-admins.dto';
import { CoursesAdminModel } from '@/models/courses-admin.model';
import { FindAllCoursesAdminsQuery } from '@/queries/implements/courses-admins/find-all-courses-admins.query';

@Injectable()
export class FindAllCoursesAdminsService
  implements
    IBaseService<
      FindAllCoursesAdminsDTO,
      Promise<IPaginatedType<CoursesAdminModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllCoursesAdminsDTO
  ): Promise<IPaginatedType<CoursesAdminModel>> {
    return await this.queryBus.execute(new FindAllCoursesAdminsQuery(data));
  }
}

import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { CoursesAdminModel } from '@/models/courses-admin.model';
import { FindCoursesAdminByIdQuery } from '@/queries/implements/courses-admins/find-courses-admin-by-id.query';

@Injectable()
export class FindCoursesAdminByIdService
  implements IBaseService<string, Promise<CoursesAdminModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CoursesAdminModel> {
    return await this.queryBus.execute(new FindCoursesAdminByIdQuery(data));
  }
}

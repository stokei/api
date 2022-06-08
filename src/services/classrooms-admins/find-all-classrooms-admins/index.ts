import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { ClassroomsAdminModel } from '@/models/classrooms-admin.model';
import { FindAllClassroomsAdminsDTO } from '@/dtos/classrooms-admins/find-all-classrooms-admins.dto';
import { FindAllClassroomsAdminsQuery } from '@/queries/implements/classrooms-admins/find-all-classrooms-admins.query';

@Injectable()
export class FindAllClassroomsAdminsService
  implements
    IBaseService<
      FindAllClassroomsAdminsDTO,
      Promise<IPaginatedType<ClassroomsAdminModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllClassroomsAdminsDTO
  ): Promise<IPaginatedType<ClassroomsAdminModel>> {
    return await this.queryBus.execute(new FindAllClassroomsAdminsQuery(data));
  }
}

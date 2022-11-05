import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllAppInstructorsDTO } from '@/dtos/app-instructors/find-all-app-instructors.dto';
import { AppInstructorModel } from '@/models/app-instructor.model';
import { FindAllAppInstructorsQuery } from '@/queries/implements/app-instructors/find-all-app-instructors.query';

@Injectable()
export class FindAllAppInstructorsService
  implements
    IBaseService<
      FindAllAppInstructorsDTO,
      Promise<IPaginatedType<AppInstructorModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllAppInstructorsDTO
  ): Promise<IPaginatedType<AppInstructorModel>> {
    return await this.queryBus.execute(new FindAllAppInstructorsQuery(data));
  }
}

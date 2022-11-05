import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { AppInstructorModel } from '@/models/app-instructor.model';
import { FindAppInstructorByIdQuery } from '@/queries/implements/app-instructors/find-app-instructor-by-id.query';

@Injectable()
export class FindAppInstructorByIdService
  implements IBaseService<string, Promise<AppInstructorModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<AppInstructorModel> {
    return await this.queryBus.execute(new FindAppInstructorByIdQuery(data));
  }
}

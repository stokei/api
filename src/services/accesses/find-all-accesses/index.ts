import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllAccessesDTO } from '@/dtos/accesses/find-all-accesses.dto';
import { AccessModel } from '@/models/access.model';
import { FindAllAccessesQuery } from '@/queries/implements/accesses/find-all-accesses.query';

@Injectable()
export class FindAllAccessesService
  implements
    IBaseService<FindAllAccessesDTO, Promise<IPaginatedType<AccessModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllAccessesDTO
  ): Promise<IPaginatedType<AccessModel>> {
    return await this.queryBus.execute(new FindAllAccessesQuery(data));
  }
}

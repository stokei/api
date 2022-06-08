import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { VersionModel } from '@/models/version.model';
import { FindAllVersionsDTO } from '@/dtos/versions/find-all-versions.dto';
import { FindAllVersionsQuery } from '@/queries/implements/versions/find-all-versions.query';

@Injectable()
export class FindAllVersionsService
  implements
    IBaseService<FindAllVersionsDTO, Promise<IPaginatedType<VersionModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllVersionsDTO
  ): Promise<IPaginatedType<VersionModel>> {
    return await this.queryBus.execute(new FindAllVersionsQuery(data));
  }
}

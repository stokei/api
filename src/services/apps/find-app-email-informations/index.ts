import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import {
  FindAppEmailInformationsDTO,
  FindAppEmailInformationsResponse
} from '@/dtos/apps/find-app-email-informations.dto';
import { FindAppEmailInformationsQuery } from '@/queries/implements/apps/find-app-email-informations.query';

@Injectable()
export class FindAppEmailInformationsService
  implements
    IBaseService<
      FindAppEmailInformationsDTO,
      Promise<FindAppEmailInformationsResponse>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAppEmailInformationsDTO
  ): Promise<FindAppEmailInformationsResponse> {
    return await this.queryBus.execute(new FindAppEmailInformationsQuery(data));
  }
}

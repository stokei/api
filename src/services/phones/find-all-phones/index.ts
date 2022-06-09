import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllPhonesDTO } from '@/dtos/phones/find-all-phones.dto';
import { PhoneModel } from '@/models/phone.model';
import { FindAllPhonesQuery } from '@/queries/implements/phones/find-all-phones.query';

@Injectable()
export class FindAllPhonesService
  implements
    IBaseService<FindAllPhonesDTO, Promise<IPaginatedType<PhoneModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllPhonesDTO): Promise<IPaginatedType<PhoneModel>> {
    return await this.queryBus.execute(new FindAllPhonesQuery(data));
  }
}

import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { PhoneModel } from '@/models/phone.model';
import { FindPhoneByIdQuery } from '@/queries/implements/phones/find-phone-by-id.query';

@Injectable()
export class FindPhoneByIdService
  implements IBaseService<string, Promise<PhoneModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<PhoneModel> {
    return await this.queryBus.execute(new FindPhoneByIdQuery(data));
  }
}

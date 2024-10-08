import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  PhoneNotFoundException
} from '@/errors';
import { PhoneModel } from '@/models/phone.model';
import { FindPhoneByIdQuery } from '@/queries/implements/phones/find-phone-by-id.query';
import { FindPhoneByIdRepository } from '@/repositories/phones/find-phone-by-id';

@QueryHandler(FindPhoneByIdQuery)
export class FindPhoneByIdQueryHandler
  implements IQueryHandler<FindPhoneByIdQuery>
{
  constructor(
    private readonly findPhoneByIdRepository: FindPhoneByIdRepository
  ) {}

  async execute(query: FindPhoneByIdQuery): Promise<PhoneModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const phone = await this.findPhoneByIdRepository.execute(id);
    if (!phone) {
      throw new PhoneNotFoundException();
    }
    return phone;
  }
}

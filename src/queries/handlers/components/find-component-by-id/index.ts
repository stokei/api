import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  ComponentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ComponentModel } from '@/models/component.model';
import { FindComponentByIdQuery } from '@/queries/implements/components/find-component-by-id.query';
import { FindComponentByIdRepository } from '@/repositories/components/find-component-by-id';

@QueryHandler(FindComponentByIdQuery)
export class FindComponentByIdQueryHandler
  implements IQueryHandler<FindComponentByIdQuery>
{
  constructor(
    private readonly findComponentByIdRepository: FindComponentByIdRepository
  ) {}

  async execute(query: FindComponentByIdQuery): Promise<ComponentModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const component = await this.findComponentByIdRepository.execute(id);
    if (!component) {
      throw new ComponentNotFoundException();
    }
    return component;
  }
}

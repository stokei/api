import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  CartsItemNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CartsItemModel } from '@/models/carts-item.model';
import { FindCartsItemByIdRepository } from '@/repositories/carts-items/find-carts-item-by-id';
import { FindCartsItemByIdQuery } from '@/queries/implements/carts-items/find-carts-item-by-id.query';

@QueryHandler(FindCartsItemByIdQuery)
export class FindCartsItemByIdQueryHandler
  implements IQueryHandler<FindCartsItemByIdQuery>
{
  constructor(
    private readonly findCartsItemByIdRepository: FindCartsItemByIdRepository
  ) {}

  async execute(query: FindCartsItemByIdQuery): Promise<CartsItemModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const cartsItem = await this.findCartsItemByIdRepository.execute(id);
    if (!cartsItem) {
      throw new CartsItemNotFoundException();
    }
    return cartsItem;
  }
}

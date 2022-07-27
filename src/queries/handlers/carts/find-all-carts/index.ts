import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { CartMapper } from '@/mappers/carts';
import { CartModel } from '@/models/cart.model';
import { FindAllCartsQuery } from '@/queries/implements/carts/find-all-carts.query';
import { CountCartsRepository } from '@/repositories/carts/count-carts';
import { FindAllCartsRepository } from '@/repositories/carts/find-all-carts';

@QueryHandler(FindAllCartsQuery)
export class FindAllCartsQueryHandler
  implements IQueryHandler<FindAllCartsQuery>
{
  constructor(
    private readonly findAllCartRepository: FindAllCartsRepository,
    private readonly countCartsRepository: CountCartsRepository
  ) {}

  async execute(query: FindAllCartsQuery): Promise<IPaginatedType<CartModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new CartMapper().toFindAllQueryClean(query);
    const carts = await this.findAllCartRepository.execute(data);
    const totalCount = await this.countCartsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CartModel>().toPaginationList({
      items: carts,
      page: data.page,
      totalCount
    });
  }
}

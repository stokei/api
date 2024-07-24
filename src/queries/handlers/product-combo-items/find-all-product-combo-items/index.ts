import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { ProductComboItemMapper } from '@/mappers/product-combo-items';
import { ProductComboItemModel } from '@/models/product-combo-item.model';
import { FindAllProductComboItemsQuery } from '@/queries/implements/product-combo-items/find-all-product-combo-items.query';
import { CountProductComboItemsRepository } from '@/repositories/product-combo-items/count-product-combo-items';
import { FindAllProductComboItemsRepository } from '@/repositories/product-combo-items/find-all-product-combo-items';

@QueryHandler(FindAllProductComboItemsQuery)
export class FindAllProductComboItemsQueryHandler
  implements IQueryHandler<FindAllProductComboItemsQuery>
{
  constructor(
    private readonly findAllProductComboItemRepository: FindAllProductComboItemsRepository,
    private readonly countProductComboItemsRepository: CountProductComboItemsRepository
  ) {}

  async execute(
    query: FindAllProductComboItemsQuery
  ): Promise<IPaginatedType<ProductComboItemModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new ProductComboItemMapper().toFindAllQueryClean(query);
    const productComboItems =
      await this.findAllProductComboItemRepository.execute(data);
    const totalCount = await this.countProductComboItemsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ProductComboItemModel>().toPaginationList({
      items: productComboItems,
      page: data.page,
      totalCount
    });
  }
}

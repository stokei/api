import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  IOperator,
  IPaginatedType,
  PaginationMapper,
  cleanObject,
  cleanSortValue,
  cleanValueNumber,
  cleanWhereDataString,
  cleanWhereDataSearch,
  cleanValue,
  splitServiceId
} from '@stokei/nestjs';
import { DataNotFoundException } from '@/errors';
import { ProductsImageModel } from '@/models/products-image.model';
import { FindAllProductsImagesQuery } from '@/queries/implements/products-images/find-all-products-images.query';
import { CountProductsImagesRepository } from '@/repositories/products-images/count-products-images';
import { FindAllProductsImagesRepository } from '@/repositories/products-images/find-all-products-images';

@QueryHandler(FindAllProductsImagesQuery)
export class FindAllProductsImagesQueryHandler
  implements IQueryHandler<FindAllProductsImagesQuery>
{
  constructor(
    private readonly findAllProductsImageRepository: FindAllProductsImagesRepository,
    private readonly countProductsImagesRepository: CountProductsImagesRepository
  ) {}

  async execute(
    query: FindAllProductsImagesQuery
  ): Promise<IPaginatedType<ProductsImageModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const productsImages = await this.findAllProductsImageRepository.execute(
      data
    );
    const totalCount = await this.countProductsImagesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ProductsImageModel>().toPaginationList({
      items: productsImages,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllProductsImagesQuery
  ): FindAllProductsImagesQuery {
    if (!query) {
      return null;
    }
    const clearWhereOperatorData = (operator: IOperator) => {
      const operatorData = query?.where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        [operator]: {
          parent: cleanWhereDataString(operatorData.parent),
          name: cleanWhereDataSearch(operatorData.name),
          ids:
            operatorData.ids?.length > 0
              ? operatorData.ids.map((id) => splitServiceId(cleanValue(id))?.id)
              : undefined
        }
      };
    };
    return {
      ...query,
      where: {
        ...cleanObject(clearWhereOperatorData('AND')),
        ...cleanObject(clearWhereOperatorData('OR')),
        ...cleanObject(clearWhereOperatorData('NOT'), true)
      },
      page: cleanObject({
        limit: cleanValueNumber(query.page?.limit),
        number: cleanValueNumber(query.page?.number)
      }),
      orderBy: cleanObject({
        name: cleanSortValue(query.orderBy?.name),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt)
      })
    };
  }
}

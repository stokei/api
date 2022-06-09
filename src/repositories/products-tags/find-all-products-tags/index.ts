import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  IBaseRepository,
  IOperator,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllProductsTagsDTO } from '@/dtos/products-tags/find-all-products-tags.dto';
import { ProductsTagMapper } from '@/mappers/products-tags';
import { ProductsTagModel } from '@/models/products-tag.model';

@Injectable()
export class FindAllProductsTagsRepository
  implements
    IBaseRepository<FindAllProductsTagsDTO, Promise<ProductsTagModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllProductsTagsDTO): Promise<ProductsTagModel[]> {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    const mapFromDTOOperatorDataToPrismaOperatorData = (
      operator: IOperator
    ) => {
      const operatorData = data?.where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        id: prismaMapper.toWhereIds(operatorData.ids),
        name: prismaMapper.toWhereDataSearch(operatorData.name),
        parent: prismaMapper.toWhereData(operatorData.parent)
      };
    };
    return new ProductsTagMapper().toModels(
      await this.model.productsTag.findMany({
        where: prismaMapper.toWhere({
          AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
          OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
          NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
        }),
        orderBy,
        ...prismaMapper.toPagination({ page: data?.page })
      })
    );
  }
}

import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  IBaseRepository,
  IOperator,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllProductsImagesDTO } from '@/dtos/products-images/find-all-products-images.dto';
import { ProductsImageMapper } from '@/mappers/products-images';
import { ProductsImageModel } from '@/models/products-image.model';

@Injectable()
export class FindAllProductsImagesRepository
  implements
    IBaseRepository<FindAllProductsImagesDTO, Promise<ProductsImageModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllProductsImagesDTO): Promise<ProductsImageModel[]> {
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
    return new ProductsImageMapper().toModels(
      await this.model.productsImage.findMany({
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

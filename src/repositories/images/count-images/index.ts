import { Injectable } from '@nestjs/common';
import {
  IBaseRepository,
  IOperator,
  IWhere,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountImagesDTO } from '@/dtos/images/count-images.dto';

@Injectable()
export class CountImagesRepository
  implements IBaseRepository<CountImagesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountImagesDTO): Promise<number> {
    const prismaMapper = new PrismaMapper();
    const mapFromDTOOperatorDataToPrismaOperatorData = (
      operator: IOperator
    ) => {
      const operatorData = where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        id: prismaMapper.toWhereIds(operatorData.ids),
        name: prismaMapper.toWhereDataSearch(operatorData.name),
        parent: prismaMapper.toWhereData(operatorData.parent),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy)
      };
    };
    return await this.model.image.count({
      where: prismaMapper.toWhere({
        AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
        OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
        NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
      })
    });
  }
}

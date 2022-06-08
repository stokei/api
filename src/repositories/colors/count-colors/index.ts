import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { CountColorsDTO } from '@/dtos/colors/count-colors.dto';
import {
  IBaseRepository,
  PrismaMapper,
  IOperator,
  IWhere
} from '@stokei/nestjs';

@Injectable()
export class CountColorsRepository
  implements IBaseRepository<CountColorsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountColorsDTO): Promise<number> {
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
        parent: prismaMapper.toWhereData(operatorData.parent)
      };
    };
    return await this.model.color.count({
      where: prismaMapper.toWhere({
        AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
        OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
        NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
      })
    });
  }
}

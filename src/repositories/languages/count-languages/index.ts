import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { CountLanguagesDTO } from '@/dtos/languages/count-languages.dto';
import {
  IBaseRepository,
  PrismaMapper,
  IOperator,
  IWhere
} from '@stokei/nestjs';

@Injectable()
export class CountLanguagesRepository
  implements IBaseRepository<CountLanguagesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountLanguagesDTO): Promise<number> {
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
    return await this.model.language.count({
      where: prismaMapper.toWhere({
        AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
        OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
        NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
      })
    });
  }
}

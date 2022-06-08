import { Injectable } from '@nestjs/common';
import {
  IBaseRepository,
  IOperator,
  PrismaMapper,
  cleanObject
} from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { FindAllSitesDarkColorsDTO } from '@/dtos/sites-dark-colors/find-all-sites-dark-colors.dto';
import { SitesDarkColorMapper } from '@/mappers/sites-dark-colors';
import { SitesDarkColorModel } from '@/models/sites-dark-color.model';

@Injectable()
export class FindAllSitesDarkColorsRepository
  implements
    IBaseRepository<FindAllSitesDarkColorsDTO, Promise<SitesDarkColorModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllSitesDarkColorsDTO
  ): Promise<SitesDarkColorModel[]> {
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
    return new SitesDarkColorMapper().toModels(
      await this.model.sitesDarkColor.findMany({
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

import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  IBaseRepository,
  IOperator,
  IWhere,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import {
  FindAllAccessesDTO,
  WhereDataFindAllAccessesDTO
} from '@/dtos/accesses/find-all-accesses.dto';
import { AccessMapper } from '@/mappers/accesses';
import { AccessModel } from '@/models/access.model';

@Injectable()
export class FindAllAccessesRepository
  implements IBaseRepository<FindAllAccessesDTO, Promise<AccessModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllAccessesDTO): Promise<AccessModel[]> {
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
        parent: prismaMapper.toWhereData(operatorData.parent),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy)
      };
    };
    return new AccessMapper().toModels(
      await this.model.access.findMany({
        where: prismaMapper.toWhere<IWhere<WhereDataFindAllAccessesDTO>>({
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

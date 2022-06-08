import { Injectable } from '@nestjs/common';
import {
  IBaseRepository,
  IOperator,
  PrismaMapper,
  cleanObject
} from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { FindAllTagsDTO } from '@/dtos/tags/find-all-tags.dto';
import { TagMapper } from '@/mappers/tags';
import { TagModel } from '@/models/tag.model';

@Injectable()
export class FindAllTagsRepository
  implements IBaseRepository<FindAllTagsDTO, Promise<TagModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllTagsDTO): Promise<TagModel[]> {
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
    return new TagMapper().toModels(
      await this.model.tag.findMany({
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

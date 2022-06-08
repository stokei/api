import { Injectable } from '@nestjs/common';
import {
  IBaseRepository,
  IOperator,
  PrismaMapper,
  cleanObject
} from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { FindAllProjectsMembersDTO } from '@/dtos/projects-members/find-all-projects-members.dto';
import { ProjectsMemberMapper } from '@/mappers/projects-members';
import { ProjectsMemberModel } from '@/models/projects-member.model';

@Injectable()
export class FindAllProjectsMembersRepository
  implements
    IBaseRepository<FindAllProjectsMembersDTO, Promise<ProjectsMemberModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllProjectsMembersDTO
  ): Promise<ProjectsMemberModel[]> {
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
    return new ProjectsMemberMapper().toModels(
      await this.model.projectsMember.findMany({
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

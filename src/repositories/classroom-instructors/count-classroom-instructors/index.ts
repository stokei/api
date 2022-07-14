import { Injectable } from '@nestjs/common';
import { IBaseRepository, IOperator, PrismaMapper } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountClassroomInstructorsDTO } from '@/dtos/classroom-instructors/count-classroom-instructors.dto';

@Injectable()
export class CountClassroomInstructorsRepository
  implements IBaseRepository<CountClassroomInstructorsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountClassroomInstructorsDTO): Promise<number> {
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
        instructor: prismaMapper.toWhereData(operatorData.instructor),
        classroom: prismaMapper.toWhereData(operatorData.classroom),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy)
      };
    };
    return await this.model.classroomInstructor.count({
      where: prismaMapper.toWhere({
        AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
        OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
        NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
      })
    });
  }
}

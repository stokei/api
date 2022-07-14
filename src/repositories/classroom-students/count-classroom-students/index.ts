import { Injectable } from '@nestjs/common';
import { IBaseRepository, IOperator, PrismaMapper } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountClassroomStudentsDTO } from '@/dtos/classroom-students/count-classroom-students.dto';

@Injectable()
export class CountClassroomStudentsRepository
  implements IBaseRepository<CountClassroomStudentsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountClassroomStudentsDTO): Promise<number> {
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
        student: prismaMapper.toWhereData(operatorData.student),
        classroom: prismaMapper.toWhereData(operatorData.classroom),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy)
      };
    };
    return await this.model.classroomStudent.count({
      where: prismaMapper.toWhere({
        AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
        OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
        NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
      })
    });
  }
}

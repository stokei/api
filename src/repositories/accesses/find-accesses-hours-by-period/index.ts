import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAccessesHoursByPeriodDTO } from '@/dtos/accesses/find-accesses-hours-by-period.dto';
import { ChartDataMapper } from '@/mappers/chart-data';
import { ChartDataModel } from '@/models/chart-data.model';

@Injectable()
export class FindAccessesHoursByPeriodRepository
  implements
    IBaseRepository<FindAccessesHoursByPeriodDTO, Promise<ChartDataModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    app,
    startAt,
    endAt
  }: FindAccessesHoursByPeriodDTO): Promise<ChartDataModel[]> {
    const response: ChartDataModel[] = await this.model.$queryRaw`
      SELECT SUBSTR(TIME(accesses.created_at), 1, 2) as label, COUNT(accesses.id) as value FROM accesses 
        WHERE accesses.app = ${app} AND
          DATE(accesses.created_at) >= DATE(${startAt}) AND
          DATE(accesses.created_at) <= DATE(${endAt})
        GROUP BY label
        ORDER BY label;
    `;
    return new ChartDataMapper().toModels(response);
  }
}

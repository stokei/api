import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAccessesFrequencyByPeriodDTO } from '@/dtos/accesses/find-accesses-frequency-by-period.dto';
import { ChartDataMapper } from '@/mappers/chart-data';
import { ChartDataModel } from '@/models/chart-data.model';

@Injectable()
export class FindAccessesFrequencyByPeriodRepository
  implements
    IBaseRepository<
      FindAccessesFrequencyByPeriodDTO,
      Promise<ChartDataModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    app,
    startAt,
    endAt
  }: FindAccessesFrequencyByPeriodDTO): Promise<ChartDataModel[]> {
    const response: ChartDataModel[] = await this.model.$queryRaw`
      SELECT DATE(accesses.created_at) as label, COUNT(accesses.id) as value FROM accesses 
        WHERE accesses.app = ${app} AND
          DATE(accesses.created_at) >= DATE(${startAt}) AND
          DATE(accesses.created_at) <= DATE(${endAt})
        GROUP BY label;
    `;
    return new ChartDataMapper().toModels(response);
  }
}

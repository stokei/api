import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindOrdersFrequencyByPeriodDTO } from '@/dtos/orders/find-orders-frequency-by-period.dto';
import { ChartDataMapper } from '@/mappers/chart-data';
import { ChartDataModel } from '@/models/chart-data.model';

@Injectable()
export class FindOrdersFrequencyByPeriodRepository
  implements
    IBaseRepository<FindOrdersFrequencyByPeriodDTO, Promise<ChartDataModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    app,
    status,
    startAt,
    endAt
  }: FindOrdersFrequencyByPeriodDTO): Promise<ChartDataModel[]> {
    const response: ChartDataModel[] = await this.model.$queryRaw`
      SELECT DATE(orders.created_at) as label, COUNT(orders.id) as value FROM orders 
        WHERE orders.app = ${app} AND
          orders.status = ${status} AND
          DATE(orders.created_at) >= DATE(${startAt}) AND
          DATE(orders.created_at) <= DATE(${endAt})
        GROUP BY label;
    `;
    return new ChartDataMapper().toModels(response);
  }
}

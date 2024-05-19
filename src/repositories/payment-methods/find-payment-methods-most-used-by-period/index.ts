import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindPaymentMethodsMostUsedByPeriodDTO } from '@/dtos/payment-methods/find-payment-methods-most-used-by-period.dto';
import { ChartDataMapper } from '@/mappers/chart-data';
import { ChartDataModel } from '@/models/chart-data.model';

@Injectable()
export class FindPaymentMethodsMostUsedByPeriodRepository
  implements
    IBaseRepository<
      FindPaymentMethodsMostUsedByPeriodDTO,
      Promise<ChartDataModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    app,
    startAt,
    endAt
  }: FindPaymentMethodsMostUsedByPeriodDTO): Promise<ChartDataModel[]> {
    const response: ChartDataModel[] = await this.model.$queryRaw`
      SELECT payments_methods.payment_method_type as label, COUNT(*) as value FROM payments 
        JOIN payments_methods
        ON CONCAT('pay_method_', payments_methods.id) = payments.payment_method
        WHERE payments.app = ${app} AND
  	      payments.status = 'PAID' AND
          DATE(payments.created_at) >= DATE(${startAt}) AND
          DATE(payments.created_at) <= DATE(${endAt})
        GROUP BY label
        ORDER BY value DESC;
    `;
    return new ChartDataMapper().toModels(response);
  }
}

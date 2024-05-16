import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindProductsBestSellerByPeriodDTO } from '@/dtos/products/find-products-best-seller-by-period.dto';
import { OrderStatus } from '@/enums/order-status.enum';

interface FindProductsBestSellerByPeriodRepositoryResponse {
  product: string;
  quantity: number;
}

@Injectable()
export class FindProductsBestSellerByPeriodRepository
  implements
    IBaseRepository<
      FindProductsBestSellerByPeriodDTO,
      Promise<FindProductsBestSellerByPeriodRepositoryResponse[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    app,
    startAt,
    endAt
  }: FindProductsBestSellerByPeriodDTO): Promise<
    FindProductsBestSellerByPeriodRepositoryResponse[]
  > {
    const response: FindProductsBestSellerByPeriodRepositoryResponse[] =
      await this.model.$queryRaw`
      SELECT order_items.product as product, COUNT(*) as quantity FROM order_items 
        JOIN orders
        ON CONCAT('order_', orders.id) = order_items.parent
        WHERE order_items.app = ${app} AND
          orders.status = ${OrderStatus.PAID} AND
          DATE(order_items.created_at) >= DATE(${startAt}) AND
          DATE(order_items.created_at) <= DATE(${endAt})
        GROUP BY product
        ORDER BY quantity DESC
        LIMIT 5;
    `;
    return response?.map((item) => ({
      ...item,
      quantity: Number(item.quantity)
    }));
  }
}

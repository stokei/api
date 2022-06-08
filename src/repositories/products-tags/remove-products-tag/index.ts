import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveProductsTagDTO } from '@/dtos/products-tags/remove-products-tag.dto';

@Injectable()
export class RemoveProductsTagRepository
  implements IBaseRepository<RemoveProductsTagDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveProductsTagDTO): Promise<boolean> {
    const removed = await this.model.productsTag.delete({
      where: {
        id: where?.productsTagId
      }
    });
    return !!removed;
  }
}

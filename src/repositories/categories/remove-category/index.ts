import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveCategoryDTO } from '@/dtos/categories/remove-category.dto';

@Injectable()
export class RemoveCategoryRepository
  implements IBaseRepository<RemoveCategoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveCategoryDTO): Promise<boolean> {
    const removed = await this.model.category.delete({
      where: {
        id: where?.categoryId
      }
    });
    return !!removed;
  }
}

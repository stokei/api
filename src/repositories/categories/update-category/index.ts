import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateCategoryDTO } from '@/dtos/categories/update-category.dto';

@Injectable()
export class UpdateCategoryRepository
  implements IBaseRepository<UpdateCategoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateCategoryDTO): Promise<boolean> {
    const updated = await this.model.category.update({
      where: {
        id: where?.categoryId
      },
      data
    });
    return !!updated;
  }
}

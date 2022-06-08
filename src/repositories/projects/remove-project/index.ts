import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveProjectDTO } from '@/dtos/projects/remove-project.dto';

@Injectable()
export class RemoveProjectRepository
  implements IBaseRepository<RemoveProjectDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveProjectDTO): Promise<boolean> {
    const removed = await this.model.project.delete({
      where: {
        id: where?.projectId
      }
    });
    return !!removed;
  }
}

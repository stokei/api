import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateProjectDTO } from '@/dtos/projects/update-project.dto';

@Injectable()
export class UpdateProjectRepository
  implements IBaseRepository<UpdateProjectDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateProjectDTO): Promise<boolean> {
    const updated = await this.model.project.update({
      where: {
        id: where?.projectId
      },
      data
    });
    return !!updated;
  }
}

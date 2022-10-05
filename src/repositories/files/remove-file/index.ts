import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveFileDTO } from '@/dtos/files/remove-file.dto';

@Injectable()
export class RemoveFileRepository
  implements IBaseRepository<RemoveFileDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveFileDTO): Promise<boolean> {
    const removed = await this.model.file.delete({
      where: {
        id: where?.file
      }
    });
    return !!removed;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveFileDTO } from '@/dtos/files/remove-file.dto';

@Injectable()
export class RemoveFileRepository
  implements IBaseRepository<RemoveFileDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveFileDTO): Promise<boolean> {
    const removed = await this.model.file.delete({
      where: {
        id: where?.fileId
      }
    });
    return !!removed;
  }
}

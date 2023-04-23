import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ActivateFileRepositoryDTO } from '@/dtos/files/activate-file-repository.dto';

@Injectable()
export class ActivateFileRepository
  implements IBaseRepository<ActivateFileRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: ActivateFileRepositoryDTO): Promise<boolean> {
    const updated = await this.model.file.update({
      where: {
        id: where?.file
      },
      data
    });
    return !!updated;
  }
}

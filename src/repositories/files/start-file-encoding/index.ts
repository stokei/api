import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { StartFileEncodingRepositoryDTO } from '@/dtos/files/start-file-encoding-repository.dto';

@Injectable()
export class StartFileEncodingRepository
  implements IBaseRepository<StartFileEncodingRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: StartFileEncodingRepositoryDTO): Promise<boolean> {
    const updated = await this.model.file.update({
      where: {
        id: where?.file
      },
      data
    });
    return !!updated;
  }
}

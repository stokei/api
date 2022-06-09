import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateFileDTO } from '@/dtos/files/update-file.dto';

@Injectable()
export class UpdateFileRepository
  implements IBaseRepository<UpdateFileDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateFileDTO): Promise<boolean> {
    const updated = await this.model.file.update({
      where: {
        id: where?.fileId
      },
      data
    });
    return !!updated;
  }
}

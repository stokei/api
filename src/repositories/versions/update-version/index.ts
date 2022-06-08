import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateVersionDTO } from '@/dtos/versions/update-version.dto';

@Injectable()
export class UpdateVersionRepository
  implements IBaseRepository<UpdateVersionDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateVersionDTO): Promise<boolean> {
    const updated = await this.model.version.update({
      where: {
        id: where?.versionId
      },
      data
    });
    return !!updated;
  }
}

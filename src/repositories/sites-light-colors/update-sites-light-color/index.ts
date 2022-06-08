import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateSitesLightColorDTO } from '@/dtos/sites-light-colors/update-sites-light-color.dto';

@Injectable()
export class UpdateSitesLightColorRepository
  implements IBaseRepository<UpdateSitesLightColorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateSitesLightColorDTO): Promise<boolean> {
    const updated = await this.model.sitesLightColor.update({
      where: {
        id: where?.sitesLightColorId
      },
      data
    });
    return !!updated;
  }
}

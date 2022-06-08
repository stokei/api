import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateSitesDarkColorDTO } from '@/dtos/sites-dark-colors/update-sites-dark-color.dto';

@Injectable()
export class UpdateSitesDarkColorRepository
  implements IBaseRepository<UpdateSitesDarkColorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateSitesDarkColorDTO): Promise<boolean> {
    const updated = await this.model.sitesDarkColor.update({
      where: {
        id: where?.sitesDarkColorId
      },
      data
    });
    return !!updated;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveSitesDarkColorDTO } from '@/dtos/sites-dark-colors/remove-sites-dark-color.dto';

@Injectable()
export class RemoveSitesDarkColorRepository
  implements IBaseRepository<RemoveSitesDarkColorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveSitesDarkColorDTO): Promise<boolean> {
    const removed = await this.model.sitesDarkColor.delete({
      where: {
        id: where?.sitesDarkColorId
      }
    });
    return !!removed;
  }
}

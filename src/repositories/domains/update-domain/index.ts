import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateDomainDTO } from '@/dtos/domains/update-domain.dto';

@Injectable()
export class UpdateDomainRepository
  implements IBaseRepository<UpdateDomainDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateDomainDTO): Promise<boolean> {
    const updated = await this.model.domain.update({
      where: {
        id: where?.domainId
      },
      data
    });
    return !!updated;
  }
}

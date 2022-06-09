import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdatePhoneDTO } from '@/dtos/phones/update-phone.dto';

@Injectable()
export class UpdatePhoneRepository
  implements IBaseRepository<UpdatePhoneDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdatePhoneDTO): Promise<boolean> {
    const updated = await this.model.phone.update({
      where: {
        id: where?.phoneId
      },
      data
    });
    return !!updated;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
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

import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { PhoneMapper } from '@/mappers/phones';
import { PhoneModel } from '@/models/phone.model';

@Injectable()
export class FindPhoneByIdRepository
  implements IBaseRepository<string, Promise<PhoneModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<PhoneModel> {
    return new PhoneMapper().toModel(
      await this.model.phone.findUnique({
        where: { id }
      })
    );
  }
}

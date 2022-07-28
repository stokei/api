import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllPhonesDTO } from '@/dtos/phones/find-all-phones.dto';
import { PhoneMapper } from '@/mappers/phones';
import { PhoneModel } from '@/models/phone.model';

@Injectable()
export class FindAllPhonesRepository
  implements IBaseRepository<FindAllPhonesDTO, Promise<PhoneModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllPhonesDTO): Promise<PhoneModel[]> {
    const phoneMapper = new PhoneMapper();
    return phoneMapper.toModels(
      await this.model.phone.findMany(phoneMapper.toFindAllPrisma(data))
    );
  }
}

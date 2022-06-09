import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreatePhoneDTO } from '@/dtos/phones/create-phone.dto';
import { PhoneMapper } from '@/mappers/phones';
import { PhoneModel } from '@/models/phone.model';

@Injectable()
export class CreatePhoneRepository
  implements IBaseRepository<CreatePhoneDTO, Promise<PhoneModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreatePhoneDTO): Promise<PhoneModel> {
    return new PhoneMapper().toModel(await this.model.phone.create({ data }));
  }
}

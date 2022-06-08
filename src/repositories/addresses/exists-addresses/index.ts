import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsAddressesDTO } from '@/dtos/addresses/exists-addresses.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsAddressesRepository
  implements IBaseRepository<ExistsAddressesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsAddressesDTO): Promise<boolean> {
    return (await this.model.address.count({ where })) > 0;
  }
}

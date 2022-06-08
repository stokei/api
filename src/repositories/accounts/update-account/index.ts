import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateAccountDTO } from '@/dtos/accounts/update-account.dto';

@Injectable()
export class UpdateAccountRepository
  implements IBaseRepository<UpdateAccountDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateAccountDTO): Promise<boolean> {
    const updated = await this.model.account.update({
      where: {
        id: where?.accountId
      },
      data
    });
    return !!updated;
  }
}

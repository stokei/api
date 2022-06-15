import { Injectable } from '@nestjs/common';
import { convertToISODateString, IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveAccountDTO } from '@/dtos/accounts/remove-account.dto';
import { AccountStatus } from '@/enums/account-status.enum';

@Injectable()
export class RemoveAccountRepository
  implements IBaseRepository<RemoveAccountDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveAccountDTO): Promise<boolean> {
    const removed = await this.model.account.update({
      where: {
        id: where?.accountId
      },
      data: {
        canceledAt: convertToISODateString(Date.now()),
        status: AccountStatus.CANCELED
      }
    });
    return !!removed;
  }
}

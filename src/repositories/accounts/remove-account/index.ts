import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveAccountDTO } from '@/dtos/accounts/remove-account.dto';

@Injectable()
export class RemoveAccountRepository
  implements IBaseRepository<RemoveAccountDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveAccountDTO): Promise<boolean> {
    const removed = await this.model.account.delete({
      where: {
        id: where?.accountId
      }
    });
    return !!removed;
  }
}

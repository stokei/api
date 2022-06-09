import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsAccountsDTO } from '@/dtos/accounts/exists-accounts.dto';

@Injectable()
export class ExistsAccountsRepository
  implements IBaseRepository<ExistsAccountsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsAccountsDTO): Promise<boolean> {
    return (
      (await this.model.account.count({
        where: {
          ...where,
          ...(where?.roles?.length > 0 && {
            roles: {
              hasEvery: where?.roles
            }
          })
        }
      })) > 0
    );
  }
}

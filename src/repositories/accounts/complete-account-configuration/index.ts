import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CompleteAccountConfigurationRepositoryDTO } from '@/dtos/accounts/complete-account-configuration-repository.dto';

@Injectable()
export class CompleteAccountConfigurationRepository
  implements
    IBaseRepository<
      CompleteAccountConfigurationRepositoryDTO,
      Promise<boolean>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CompleteAccountConfigurationRepositoryDTO
  ): Promise<boolean> {
    const updated = await this.model.account.update({
      where: { id: data?.account },
      data: {
        password: data?.password,
        status: data?.status
      }
    });
    return !!updated;
  }
}

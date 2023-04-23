import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CancelSubscriptionContractRepositoryDTO } from '@/dtos/subscription-contracts/cancel-subscription-contract-repository.dto';

@Injectable()
export class CancelSubscriptionContractRepository
  implements
    IBaseRepository<CancelSubscriptionContractRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: CancelSubscriptionContractRepositoryDTO): Promise<boolean> {
    const updated = await this.model.subscriptionContract.update({
      where: {
        id: where?.subscriptionContract
      },
      data
    });
    return !!updated;
  }
}

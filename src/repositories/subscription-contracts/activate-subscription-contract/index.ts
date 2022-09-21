import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ActivateSubscriptionContractRepositoryDTO } from '@/dtos/subscription-contracts/activate-subscription-contract-repository.dto';

@Injectable()
export class ActivateSubscriptionContractRepository
  implements
    IBaseRepository<
      ActivateSubscriptionContractRepositoryDTO,
      Promise<boolean>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: ActivateSubscriptionContractRepositoryDTO): Promise<boolean> {
    const updated = await this.model.subscriptionContract.update({
      where: {
        id: where?.subscriptionContract
      },
      data
    });
    return !!updated;
  }
}

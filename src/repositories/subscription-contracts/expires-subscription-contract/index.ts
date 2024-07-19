import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExpiresSubscriptionContractRepositoryDTO } from '@/dtos/subscription-contracts/expires-subscription-contract-repository.dto';

@Injectable()
export class ExpiresSubscriptionContractRepository
  implements
    IBaseRepository<ExpiresSubscriptionContractRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: ExpiresSubscriptionContractRepositoryDTO): Promise<boolean> {
    const updated = await this.model.subscriptionContract.update({
      where: {
        id: where?.subscriptionContract
      },
      data
    });
    return !!updated;
  }
}

import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateSubscriptionContractRepositoryDTO } from '@/dtos/subscription-contracts/update-subscription-contract-repository.dto';

@Injectable()
export class UpdateSubscriptionContractRepository
  implements
    IBaseRepository<UpdateSubscriptionContractRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: UpdateSubscriptionContractRepositoryDTO): Promise<boolean> {
    const updated = await this.model.subscriptionContract.update({
      where: {
        id: where?.subscriptionContract
      },
      data
    });
    return !!updated;
  }
}

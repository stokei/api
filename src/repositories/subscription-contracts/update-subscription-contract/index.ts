import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateSubscriptionContractDTO } from '@/dtos/subscription-contracts/update-subscription-contract.dto';

@Injectable()
export class UpdateSubscriptionContractRepository
  implements IBaseRepository<UpdateSubscriptionContractDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: UpdateSubscriptionContractDTO): Promise<boolean> {
    const updated = await this.model.subscriptionContract.update({
      where: {
        id: where?.subscriptionContract
      },
      data
    });
    return !!updated;
  }
}

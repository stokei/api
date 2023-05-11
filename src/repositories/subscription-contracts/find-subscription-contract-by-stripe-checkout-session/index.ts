import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { SubscriptionContractMapper } from '@/mappers/subscription-contracts';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Injectable()
export class FindSubscriptionContractByStripeCheckoutSessionRepository
  implements IBaseRepository<string, Promise<SubscriptionContractModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    stripeCheckoutSession: string
  ): Promise<SubscriptionContractModel> {
    return new SubscriptionContractMapper().toModel(
      await this.model.subscriptionContract.findFirst({
        where: { stripeCheckoutSession }
      })
    );
  }
}

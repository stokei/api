import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { CreateStripeUsageRecordDTO } from '@/dtos/stripe/create-stripe-usage-record.dto';
import { convertToISOStripeTimestamp } from '@/utils/convert-stripe-dates';

@Injectable()
export class CreateStripeUsageRecordService
  implements
    IBaseService<
      CreateStripeUsageRecordDTO,
      Promise<Stripe.Response<Stripe.UsageRecord>>
    >
{
  async execute(
    data: CreateStripeUsageRecordDTO
  ): Promise<Stripe.Response<Stripe.UsageRecord>> {
    return stripeClient.subscriptionItems.createUsageRecord(
      data.subscriptionItem,
      {
        action: data.action,
        timestamp: convertToISOStripeTimestamp(new Date().getTime()),
        quantity: data.quantity
      },
      {
        stripeAccount: data.stripeAccount,
        idempotencyKey: data.subscriptionItem
      }
    );
  }
}

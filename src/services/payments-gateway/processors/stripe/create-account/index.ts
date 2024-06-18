import { Injectable } from '@nestjs/common';

import { stripeClient } from '@/clients/stripe';
import {
  CreateAccountByPaymentProcessorDTO,
  IBaseServiceCreateAccountByPaymentProcessor
} from '@/dtos/payments-gateway/create-account-by-gateway-processor.dto';
import { LinkModel } from '@/models/link.model';

@Injectable()
export class StripeCreateAccountProcessorService
  implements IBaseServiceCreateAccountByPaymentProcessor
{
  async execute(data: CreateAccountByPaymentProcessorDTO): Promise<LinkModel> {
    const stripeResponse = await stripeClient.accounts.create({
      type: 'standard',
      email: data.app.email,
      default_currency: data.app.currency,
      business_profile: {
        name: data.app.name
      },
      metadata: {
        appParent: data.app.parent,
        app: data.app.id
      }
    });
    const link = await stripeClient.accountLinks.create({
      type: 'account_onboarding',
      refresh_url: data.cancelURL,
      return_url: data.successURL,
      account: stripeResponse?.id
    });
    return new LinkModel({
      id: stripeResponse?.id,
      url: link.url
    });
  }
}

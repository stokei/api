import { Injectable } from '@nestjs/common';

import { stripeClient } from '@/clients/stripe';
import {
  CreateAccountByPaymentProcessorDTO,
  IBaseServiceCreateAccountByPaymentProcessor
} from '@/dtos/payments-gateway/create-account-by-gateway-processor.dto';
import { PluginType } from '@/enums/plugin-type.enum';
import { LinkModel } from '@/models/link.model';
import { CreatePluginService } from '@/services/plugins/create-plugin';

@Injectable()
export class StripeCreateAccountProcessorService
  implements IBaseServiceCreateAccountByPaymentProcessor
{
  constructor(private readonly createPluginService: CreatePluginService) {}

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
    await this.createPluginService.execute({
      app: data?.app?.id,
      parent: data?.app?.id,
      publicKey: stripeResponse?.id,
      privateKey: stripeResponse?.id,
      type: PluginType.STRIPE,
      createdBy: data?.app?.createdBy
    });

    return new LinkModel({
      id: stripeResponse?.id,
      url: link.url
    });
  }
}

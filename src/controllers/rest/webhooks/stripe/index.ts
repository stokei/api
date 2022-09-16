import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { WebhookStripeService } from '@/services/webhooks/stripe';

@ApiTags(REST_CONTROLLERS_URL_NAMES.WEBHOOKS_STRIPE)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.WEBHOOKS_STRIPE,
  version: REST_VERSIONS.V1
})
export class WebhookStripeController {
  constructor(private readonly webhookStripeService: WebhookStripeService) {}

  @Post()
  async webhook(
    @Body() body: any,
    @Headers('stripe-signature') signature: string
  ) {
    return this.webhookStripeService.execute({ body, signature });
  }
}

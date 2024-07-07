import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { WebhookPagarmeService } from '@/services/webhooks/pagarme/webhook';

@ApiTags(REST_CONTROLLERS_URL_NAMES.WEBHOOKS.BASE)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.WEBHOOKS.PAGARME,
  version: REST_VERSIONS.V1
})
export class WebhookPagarmeController {
  constructor(private readonly webhookPagarmeService: WebhookPagarmeService) {}

  @Post()
  async webhook(@Body() body: any) {
    return this.webhookPagarmeService.execute({ body });
  }
}

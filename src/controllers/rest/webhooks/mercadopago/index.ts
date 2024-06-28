import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { WebhookMercadopagoService } from '@/services/webhooks/mercadopago/webhook';

@ApiTags(REST_CONTROLLERS_URL_NAMES.WEBHOOKS_MERCADOPAGO)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.WEBHOOKS_MERCADOPAGO,
  version: REST_VERSIONS.V1
})
export class WebhookMercadopagoController {
  constructor(
    private readonly webhookMercadopagoService: WebhookMercadopagoService
  ) {}

  @Post()
  async webhook(@Body() body: any) {
    return this.webhookMercadopagoService.execute({ body });
  }
}

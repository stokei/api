import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { WebhookVideosService } from '@/services/webhooks/videos/webhook';

@ApiTags(REST_CONTROLLERS_URL_NAMES.WEBHOOKS_VIDEOS)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.WEBHOOKS_VIDEOS,
  version: REST_VERSIONS.V1
})
export class WebhookVideosController {
  constructor(private readonly webhookVideosService: WebhookVideosService) {}

  @Post()
  async webhook(
    @Body() body: any,
    @Headers('Webhook-Signature') signature: string
  ) {
    return this.webhookVideosService.execute({ body, signature });
  }
}

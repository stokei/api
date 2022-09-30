import { Body, Controller, Headers, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { WebhookQencodeService } from '@/services/webhooks/qencode';

@ApiTags(REST_CONTROLLERS_URL_NAMES.WEBHOOKS_QENCODE)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.WEBHOOKS_QENCODE,
  version: REST_VERSIONS.V1
})
export class WebhookQencodeController {
  constructor(private readonly webhookQencodeService: WebhookQencodeService) {}

  @Post()
  async webhook(
    @Body() body: any,
    @Query() queryParams: any,
    @Headers('mux-signature') signature: string
  ) {
    return this.webhookQencodeService.execute({ body, queryParams, signature });
  }
}

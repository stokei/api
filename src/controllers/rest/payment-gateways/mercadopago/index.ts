import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { STOKEI_WEBSITE_BASE_URL } from '@/environments';
import { AppNotFoundException, ParamNotFoundException } from '@/errors';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CompleteAccountByPaymentProcessorService } from '@/services/payments-gateway/factories/complete-account';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

@ApiTags(REST_CONTROLLERS_URL_NAMES.PAYMENT_GATEWAYS.MERCADOPAGO.BASE)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.PAYMENT_GATEWAYS.MERCADOPAGO
    .COMPLETE_ACCOUNT,
  version: REST_VERSIONS.V1
})
export class PaymentGatewaysMercadoPagoCompleteAccountController {
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly completeAccountByPaymentProcessorService: CompleteAccountByPaymentProcessorService
  ) {}

  @Get()
  async completeAccount(@Req() request: Request, @Res() response: Response) {
    const code = request?.query?.code as string;
    const appId = request?.query?.state as string;
    if (!code) {
      throw new ParamNotFoundException('code');
    }
    if (!appId) {
      throw new ParamNotFoundException('appId');
    }
    const app = await this.findAppByIdService.execute(appId);
    if (!app) {
      throw new AppNotFoundException();
    }
    const cancelURL = appendPathnameToURL(
      STOKEI_WEBSITE_BASE_URL,
      `/apps/${app?.id}/onboardings`
    );
    const successURL = appendPathnameToURL(
      STOKEI_WEBSITE_BASE_URL,
      `/apps/${app?.id}/onboardings/mercadopago/callback`
    );
    let url = successURL;
    try {
      const mercadopagoAccount =
        await this.completeAccountByPaymentProcessorService.execute({
          app,
          code,
          paymentGatewayType: PaymentGatewayType.MERCADOPAGO,
          cancelURL,
          successURL,
          createdBy: app.createdBy
        });
      url = mercadopagoAccount?.url;
    } catch (error) {
      url = appendPathnameToURL(
        cancelURL,
        '?error=' + error?.error_description
      );
    }
    response.redirect(302, url);
  }
}

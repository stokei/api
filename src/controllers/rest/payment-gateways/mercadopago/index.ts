import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { AppNotFoundException, ParamNotFoundException } from '@/errors';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { UpdateAppService } from '@/services/apps/update-app';
import { CompleteAccountByPaymentProcessorService } from '@/services/payments-gateway/complete-account';
import { MercadoPagoCreateAccountProcessorServiceState } from '@/services/payments-gateway/processors/mercadopago/create-account';

@ApiTags(REST_CONTROLLERS_URL_NAMES.PAYMENT_GATEWAYS.MERCADOPAGO.BASE)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.PAYMENT_GATEWAYS.MERCADOPAGO
    .COMPLETE_ACCOUNT,
  version: REST_VERSIONS.V1
})
export class PaymentGatewaysMercadoPagoCompleteAccountController {
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly completeAccountByPaymentProcessorService: CompleteAccountByPaymentProcessorService,
    private readonly updateAppService: UpdateAppService
  ) {}

  @Get()
  async completeAccount(@Req() request: Request, @Res() response: Response) {
    const code = request?.query?.code as string;
    const state = request?.query?.state as string;
    if (!code) {
      throw new ParamNotFoundException('code');
    }
    if (!state) {
      throw new ParamNotFoundException('state');
    }
    const stateValue = JSON.parse(
      state
    ) as MercadoPagoCreateAccountProcessorServiceState;
    const app = await this.findAppByIdService.execute(stateValue?.appId);
    if (!app) {
      throw new AppNotFoundException();
    }
    const mercadopagoAccount =
      await this.completeAccountByPaymentProcessorService.execute({
        app,
        code,
        paymentGatewayType: PaymentGatewayType.MERCADOPAGO,
        cancelURL: stateValue?.cancelURL,
        successURL: stateValue?.successURL,
        createdBy: app.createdBy
      });
    await this.updateAppService.execute({
      data: {
        mercadopagoAccount: mercadopagoAccount?.id,
        updatedBy: app.createdBy
      },
      where: {
        app: app.id
      }
    });
    return response.location(mercadopagoAccount?.url);
  }
}

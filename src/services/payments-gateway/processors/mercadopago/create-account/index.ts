import { Injectable } from '@nestjs/common';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import {
  CreateAccountByPaymentProcessorDTO,
  IBaseServiceCreateAccountByPaymentProcessor
} from '@/dtos/payments-gateway/create-account-by-gateway-processor.dto';
import { MERCADOPAGO_CLIENT_ID, SERVER_URL } from '@/environments';
import { LinkModel } from '@/models/link.model';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

export interface MercadoPagoCreateAccountProcessorServiceState {
  appId: string;
  cancelURL: string;
  successURL: string;
}

@Injectable()
export class MercadoPagoCreateAccountProcessorService
  implements IBaseServiceCreateAccountByPaymentProcessor
{
  async execute(data: CreateAccountByPaymentProcessorDTO): Promise<LinkModel> {
    const url = new URL('https://auth.mercadopago.com/authorization');
    url.searchParams.set('client_id', MERCADOPAGO_CLIENT_ID);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('platform_id', 'mp');
    url.searchParams.set('state', data.app.id);
    url.searchParams.set(
      'redirect_uri',
      decodeURIComponent(
        appendPathnameToURL(
          SERVER_URL,
          appendPathnameToURL(
            REST_VERSIONS.V1_TEXT,
            REST_CONTROLLERS_URL_NAMES.PAYMENT_GATEWAYS.MERCADOPAGO
              .COMPLETE_ACCOUNT
          )
        )
      )
    );
    return new LinkModel({
      url: decodeURIComponent(url.toString())
    });
  }
}

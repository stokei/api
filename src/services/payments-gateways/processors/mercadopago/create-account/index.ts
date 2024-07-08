import { Injectable } from '@nestjs/common';

import {
  CreateAccountByPaymentProcessorDTO,
  IBaseServiceCreateAccountByPaymentProcessor
} from '@/dtos/payments-gateway/create-account-by-gateway-processor.dto';
import { MERCADOPAGO_CLIENT_ID } from '@/environments';
import { LinkModel } from '@/models/link.model';

import { mercadopagoAccountRedirectURL } from '../constants/mercadopago-account-redirect-url';

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
      decodeURIComponent(mercadopagoAccountRedirectURL)
    );
    return new LinkModel({
      url: decodeURIComponent(url.toString())
    });
  }
}

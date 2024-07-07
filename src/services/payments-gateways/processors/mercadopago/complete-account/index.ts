import { Injectable } from '@nestjs/common';
import { OAuth } from 'mercadopago';

import { mercadopagoClient } from '@/clients/mercadopago';
import {
  CompleteAccountByPaymentProcessorDTO,
  IBaseServiceCompleteAccountByPaymentProcessor
} from '@/dtos/payments-gateway/complete-account-by-gateway-processor.dto';
import { PluginType } from '@/enums/plugin-type.enum';
import {
  MERCADOPAGO_CLIENT_ID,
  MERCADOPAGO_CLIENT_SECRET
} from '@/environments';
import { PaymentMethodNotFoundException } from '@/errors';
import { LinkModel } from '@/models/link.model';
import { CreatePluginService } from '@/services/plugins/create-plugin';

import { mercadopagoAccountRedirectURL } from '../constants/mercadopago-account-redirect-url';

@Injectable()
export class MercadoPagoCompleteAccountProcessorService
  implements IBaseServiceCompleteAccountByPaymentProcessor
{
  constructor(private readonly createPluginService: CreatePluginService) {}

  async execute(
    data: CompleteAccountByPaymentProcessorDTO
  ): Promise<LinkModel> {
    const oauth = new OAuth(mercadopagoClient());
    const response = await oauth.create({
      body: {
        client_id: MERCADOPAGO_CLIENT_ID,
        client_secret: MERCADOPAGO_CLIENT_SECRET,
        code: data?.code,
        redirect_uri: decodeURIComponent(mercadopagoAccountRedirectURL)
      }
    });
    if (!response) {
      throw new PaymentMethodNotFoundException();
    }
    await this.createPluginService.execute({
      app: data?.app?.id,
      parent: data?.app?.id,
      publicKey: response?.access_token,
      privateKey: response?.refresh_token,
      type: PluginType.MERCADOPAGO,
      createdBy: data?.app?.createdBy
    });
    return new LinkModel({
      url: data.successURL
    });
  }
}

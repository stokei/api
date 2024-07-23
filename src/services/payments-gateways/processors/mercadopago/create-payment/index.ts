import { Injectable } from '@nestjs/common';
import { Preference } from 'mercadopago';

import { mercadopagoClient } from '@/clients/mercadopago';
import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import {
  CreatePaymentByPaymentProcessorDTO,
  IBaseServiceCreatePaymentByPaymentProcessor
} from '@/dtos/payments-gateway/create-payment-by-gateway-processor.dto';
import { PluginType } from '@/enums/plugin-type.enum';
import { MERCADOPAGO_TOKEN, SERVER_URL } from '@/environments';
import { CheckoutModel } from '@/models/checkout.model';
import { FindPluginByTypeService } from '@/services/plugins/find-plugin-by-type';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

@Injectable()
export class MercadoPagoCreatePaymentProcessorService
  implements IBaseServiceCreatePaymentByPaymentProcessor
{
  constructor(
    private readonly findPluginByTypeService: FindPluginByTypeService
  ) {}

  async execute(
    data: CreatePaymentByPaymentProcessorDTO
  ): Promise<CheckoutModel> {
    const credentials = await this.findPluginByTypeService.execute({
      app: data?.app?.id,
      parent: data?.app?.id,
      type: PluginType.MERCADOPAGO
    });
    const convertCentsToFloat = (amount: number) => (amount ? amount / 100 : 0);
    const notificationUrl = new URL(
      appendPathnameToURL(
        appendPathnameToURL(SERVER_URL, REST_VERSIONS.V1_TEXT),
        REST_CONTROLLERS_URL_NAMES.WEBHOOKS.MERCADOPAGO
      )
    );
    notificationUrl.searchParams.set('appId', data?.app?.id);
    notificationUrl.searchParams.set('paymentId', data?.payment?.id);

    const response = await new Preference(
      mercadopagoClient(credentials.publicKey)
    ).create({
      body: {
        auto_return: 'approved',
        external_reference: data?.payment?.id,
        notification_url: decodeURIComponent(notificationUrl.toString()),
        back_urls: {
          success: data?.successURL,
          failure: data?.cancelURL,
          pending: data?.successURL
        },
        items: data?.items?.map((item) => ({
          id: item.name,
          quantity: item.quantity,
          picture_url: item.imageURL || '',
          title: item.name,
          unit_price: convertCentsToFloat(
            data?.coupon
              ? data?.coupon?.getAmountWithDiscount(item.amount)
              : item.amount
          ),
          currency_id: data?.currency?.id
        })),
        payer: {
          name: data?.payer?.fullname,
          email: data?.payer.email
        },
        metadata: {
          payment: data?.payment?.id
        },
        ...(credentials?.publicKey && {
          marketplace: MERCADOPAGO_TOKEN,
          marketplace_fee: convertCentsToFloat(data?.payment.feeAmount)
        })
      }
    });
    return new CheckoutModel({
      payment: data?.payment.id,
      url: response.init_point
    });
  }
}

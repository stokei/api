import { Injectable } from '@nestjs/common';
import { addDays, cleanObject, convertToISODateString } from '@stokei/nestjs';

import { pagarmeClient } from '@/clients/pagarme';
import {
  CreatePaymentByPaymentProcessorDTO,
  IBaseServiceCreatePaymentByPaymentProcessor
} from '@/dtos/payments-gateway/create-payment-by-gateway-processor.dto';
import { PluginType } from '@/enums/plugin-type.enum';
import { PAGARME_RECIPIENT_ID } from '@/environments';
import { CheckoutModel } from '@/models/checkout.model';
import { FindPluginByTypeService } from '@/services/plugins/find-plugin-by-type';
import { getPagarmeError } from '@/utils/get-pagarme-error';

@Injectable()
export class PagarmeCreatePaymentProcessorService
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
      type: PluginType.PAGARME
    });

    const totalAmount = Math.round(data.payment?.totalAmount);
    const appTotalAmountWithoutFeeAmount = Math.round(
      totalAmount - data?.payment.feeAmount
    );
    const stokeiRecipient = {
      options: {
        charge_processing_fee: 'true',
        charge_remainder_fee: 'true',
        liable: 'true'
      },
      type: 'flat',
      recipient_id: PAGARME_RECIPIENT_ID,
      amount: data?.payment.feeAmount
    };
    const appRecipient = {
      options: {
        charge_processing_fee: 'false',
        charge_remainder_fee: 'false',
        liable: 'false'
      },
      type: 'flat',
      recipient_id: credentials?.publicKey,
      amount: appTotalAmountWithoutFeeAmount
    };
    const items = data?.items
      ?.map((item) => {
        return {
          code: item.id,
          amount: item.amount,
          description: item.name,
          quantity: item.quantity
        };
      })
      ?.filter(Boolean);

    const installments = Array.from({ length: 12 })?.map((_, index) => {
      const installment = index + 1;
      return {
        number: installment,
        total: totalAmount
      };
    });

    const expiresAt = convertToISODateString(addDays(2));
    const dataRequest = cleanObject({
      items,
      code: data?.payment?.id,
      customer: {
        name: data?.payer?.fullname,
        email: data?.payer?.email
      },
      payments: [
        {
          payment_method: 'checkout',
          amount: totalAmount,
          split: [appRecipient, stokeiRecipient],
          checkout: {
            billing_address_editable: false,
            customer_editable: false,
            skip_checkout_success_page: true,
            credit_card: {
              capture: true,
              statement_descriptor: data?.app?.name?.slice(0, 13),
              installments
            },
            boleto: {
              due_at: expiresAt
            },
            pix: {
              expires_at: expiresAt
            },
            accepted_payment_methods: ['credit_card', 'boleto', 'pix'],
            accepted_multi_payment_methods: [
              ['credit_card', 'credit_card'],
              ['credit_card', 'boleto']
            ],
            success_url: data?.successURL,
            metadata: {
              payment: data?.payment?.id
            }
          }
        }
      ]
    });
    try {
      const response = await pagarmeClient.post('/orders', dataRequest);
      const responseData = response?.data;
      if (!responseData) {
        return;
      }
      const charge = responseData?.charges?.[0];
      const lastTransaction = charge?.last_transaction;
      const errorList: any = lastTransaction?.gateway_response?.errors;
      if (errorList) {
        const error = getPagarmeError(errorList);
        if (error) {
          throw error;
        }
      }
      return new CheckoutModel({
        payment: data?.payment.id,
        url: responseData?.checkouts?.[0]?.payment_url
      });
    } catch (error) {
      console.log(error?.response?.data);
      const pagarmeError = getPagarmeError(error?.response?.data?.errors);
      if (pagarmeError) {
        throw pagarmeError;
      }
      throw error;
    }
  }
}

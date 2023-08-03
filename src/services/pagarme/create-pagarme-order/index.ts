import { Injectable } from '@nestjs/common';
import { addHours, cleanObject, IBaseService } from '@stokei/nestjs';

import { pagarmeClient } from '@/clients/pagarme';
import { CreatePagarmeOrderDTO } from '@/dtos/pagarme/create-pagarme-order.dto';
import { PagarmeOrder } from '@/dtos/pagarme/pagarme-order.dto';
import { APPLICATION_FEE_PERCENT, PAGARME_RECIPIENT_ID } from '@/environments';

@Injectable()
export class CreatePagarmeOrderService
  implements IBaseService<CreatePagarmeOrderDTO, Promise<PagarmeOrder>>
{
  async execute(data: CreatePagarmeOrderDTO): Promise<PagarmeOrder> {
    const appPercentage = Math.round(100 - APPLICATION_FEE_PERCENT);
    const stokeiRecipient = {
      options: {
        charge_processing_fee: false,
        charge_remainder_fee: false,
        liable: false
      },
      type: 'percentage',
      recipient_id: PAGARME_RECIPIENT_ID,
      amount: APPLICATION_FEE_PERCENT
    };
    const appRecipient = {
      options: {
        charge_processing_fee: true,
        charge_remainder_fee: true,
        liable: true
      },
      type: 'percentage',
      recipient_id: data?.appRecipient,
      amount: appPercentage
    };
    const items = data?.prices?.map((price) => ({
      code: price?.id,
      quantity: price?.quantity,
      amount: price?.amount,
      description: price?.name
    }));
    const totalAmount = data?.prices?.reduce(
      (previousPrice, currentPrice) => previousPrice + currentPrice?.amount,
      0
    );
    const response = await pagarmeClient.post(
      '/orders',
      cleanObject({
        items,
        payments: [
          {
            Pix: {
              expires_at: addHours(2)
            },
            amount: Math.round(totalAmount),
            payment_method: 'pix',
            split: [appRecipient, stokeiRecipient]
          }
        ],
        code: data?.orderId,
        customer_id: data?.customer
      })
    );
    const responseData = response?.data;
    if (!responseData) {
      return;
    }
    return {
      id: responseData?.id,
      code: responseData?.code,
      paymentMethod: responseData?.payment_method,
      status: responseData?.status,
      pix: {
        qrCodeURL: responseData?.charges?.[0]?.last_transaction?.qr_code_url
      }
    };
  }
}

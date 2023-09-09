import { Injectable } from '@nestjs/common';
import {
  addDays,
  cleanObject,
  convertToISODateString,
  IBaseService
} from '@stokei/nestjs';

import { pagarmeClient } from '@/clients/pagarme';
import { CreatePagarmeOrderDTO } from '@/dtos/pagarme/create-pagarme-order.dto';
import { PagarmeOrder } from '@/dtos/pagarme/pagarme-order.dto';
import { PAGARME_RECIPIENT_ID } from '@/environments';
import { getPagarmeError } from '@/utils/get-pagarme-error';

@Injectable()
export class CreatePagarmeOrderService
  implements IBaseService<CreatePagarmeOrderDTO, Promise<PagarmeOrder>>
{
  async execute(data: CreatePagarmeOrderDTO): Promise<PagarmeOrder> {
    const totalAmount = Math.round(data.totalAmount);
    const appTotalAmountWithoutFeeAmount = Math.round(
      totalAmount - data.feeAmount
    );
    const stokeiRecipient = {
      options: {
        charge_processing_fee: 'true',
        charge_remainder_fee: 'true',
        liable: 'true'
      },
      type: 'flat',
      recipient_id: PAGARME_RECIPIENT_ID,
      amount: data.feeAmount
    };
    const appRecipient = {
      options: {
        charge_processing_fee: 'false',
        charge_remainder_fee: 'false',
        liable: 'false'
      },
      type: 'flat',
      recipient_id: data?.appRecipient,
      amount: appTotalAmountWithoutFeeAmount
    };
    const items = data?.prices?.map((price) => ({
      code: price?.id,
      quantity: price?.quantity,
      amount: price?.amount,
      description: price?.name
    }));
    const dataRequest = cleanObject({
      items,
      code: data?.payment,
      customer_id: data?.customer,
      payments: [
        {
          pix: {
            expires_at: convertToISODateString(addDays(2))
          },
          amount: totalAmount,
          payment_method: 'pix',
          split: [appRecipient, stokeiRecipient]
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

      return {
        id: responseData?.id,
        code: responseData?.code,
        status: responseData?.status,
        paymentMethod: charge?.payment_method,
        error: errorList?.[0],
        pix: {
          copyAndPaste: lastTransaction?.qr_code,
          qrCodeURL: lastTransaction?.qr_code_url
        }
      };
    } catch (error) {
      const pagarmeError = getPagarmeError(error?.response?.data?.errors);
      if (pagarmeError) {
        throw pagarmeError;
      }
      throw error;
    }
  }
}

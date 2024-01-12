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
import { PaymentMethodType } from '@/enums/payment-method-type.enum';
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
    const expiresAt = convertToISODateString(addDays(2));
    const installments =
      data?.installments > 1 && data?.installments <= 12
        ? data?.installments
        : 1;
    const paymentMethodValues: Record<PaymentMethodType, any> = {
      [PaymentMethodType.BOLETO]: {
        payment_method: 'boleto',
        boleto: {
          due_at: expiresAt
        }
      },
      [PaymentMethodType.CARD]: {
        payment_method: 'credit_card',
        credit_card: {
          installments,
          statement_descriptor: data?.app?.name?.slice(0, 13),
          card_id: data?.card
        }
      },
      [PaymentMethodType.PIX]: {
        payment_method: 'pix',
        pix: {
          expires_at: expiresAt
        }
      }
    };
    const dataRequest = cleanObject({
      items,
      code: data?.payment,
      customer_id: data?.customer,
      payments: [
        {
          ...paymentMethodValues?.[data.paymentMethodType],
          amount: totalAmount,
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
        ...(lastTransaction?.card && {
          card: {
            brand: lastTransaction?.card?.brand,
            lastFourNumber: lastTransaction?.card?.last_four_digits,
            expiryMonth: lastTransaction?.card?.exp_month,
            expiryYear: lastTransaction?.card?.exp_year
          }
        }),
        ...(lastTransaction?.pdf && {
          boleto: {
            line: lastTransaction?.line,
            pdf: lastTransaction?.pdf,
            barcode: lastTransaction?.barcode
          }
        }),
        ...(lastTransaction?.qr_code_url && {
          pix: {
            copyAndPaste: lastTransaction?.qr_code,
            qrCodeURL: lastTransaction?.qr_code_url
          }
        })
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

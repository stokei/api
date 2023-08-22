import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { pagarmeClient } from '@/clients/pagarme';
import { PagarmeOrder } from '@/dtos/pagarme/pagarme-order.dto';

@Injectable()
export class FindPagarmeOrderByIdService
  implements IBaseService<string, Promise<PagarmeOrder>>
{
  async execute(data: string): Promise<PagarmeOrder> {
    const response = await pagarmeClient.get(`/orders/${data}`);
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
        copyAndPaste: responseData?.charges?.[0]?.last_transaction?.qr_code,
        qrCodeURL: responseData?.charges?.[0]?.last_transaction?.qr_code_url
      }
    };
  }
}

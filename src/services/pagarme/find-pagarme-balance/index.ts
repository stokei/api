import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { pagarmeClient } from '@/clients/pagarme';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { BalanceModel } from '@/models/balance.model';

@Injectable()
export class FindPagarmeBalanceService
  implements IBaseService<string, Promise<BalanceModel>>
{
  async execute(recipient: string): Promise<BalanceModel> {
    const response = await pagarmeClient.get(`recipients/${recipient}/balance`);
    const responseData = response?.data;
    if (!responseData) {
      return;
    }
    return new BalanceModel({
      paymentGatewayType: PaymentGatewayType.PAGARME,
      currency: responseData?.currency,
      availableAmount: responseData?.available_amount,
      pendingAmount: responseData?.waiting_funds_amount
    });
  }
}

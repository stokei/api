import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

import { PaymentStatus } from '@/enums/payment-status.enum';

export interface CountPaymentsWhereDTO {
  ids?: string[];
  customer?: IWhereData<string>;
  order?: IWhereData<string>;
  externalPaymentId?: IWhereData<string>;
  paymentMethod?: IWhereData<string>;
  status?: IWhereData<PaymentStatus>;
  oldStatus?: IWhereData<PaymentStatus>;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountPaymentsWhereDTO = keyof CountPaymentsWhereDTO;

export type CountPaymentsDTO = IBaseCountDTO<CountPaymentsWhereDTO>;

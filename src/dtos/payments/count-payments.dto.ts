import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

import { PaymentStatus } from '@/enums/payment-status.enum';

export interface CountPaymentsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  customer?: IWhereData<string>;
  order?: IWhereData<string>;
  externalPayment?: IWhereData<string>;
  paymentMethod?: IWhereData<string>;
  status?: PaymentStatus;
  oldStatus?: PaymentStatus;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountPaymentsWhereDTO = keyof CountPaymentsWhereDTO;

export type CountPaymentsDTO = IBaseCountDTO<CountPaymentsWhereDTO>;

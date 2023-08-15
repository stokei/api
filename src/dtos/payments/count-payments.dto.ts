import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { PaymentStatus } from '@/enums/payment-status.enum';

export interface CountPaymentsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  currency?: IWhereData;
  status?: PaymentStatus;
  paymentMethod?: IWhereData;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountPaymentsWhereDTO = keyof CountPaymentsWhereDTO;

export type CountPaymentsDTO = IBaseCountDTO<CountPaymentsWhereDTO>;

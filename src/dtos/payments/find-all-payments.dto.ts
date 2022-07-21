import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

import { PaymentStatus } from '@/enums/payment-status.enum';

export interface WhereDataFindAllPaymentsDTO {
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
export type IKeysWhereDataFindAllPaymentsDTO =
  keyof WhereDataFindAllPaymentsDTO;

export interface OrderByDataFindAllPaymentsDTO {
  amount?: IOrderBy;
  externalPaymentId?: IOrderBy;
  paymentMethod?: IOrderBy;
  status?: IOrderBy;
  oldStatus?: IOrderBy;
  active?: IOrderBy;
  paidAt?: IOrderBy;
  canceledAt?: IOrderBy;
  paymentErrorAt?: IOrderBy;
  totalRefundedAt?: IOrderBy;
  parcialRefundedAt?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPaymentsDTO =
  keyof OrderByDataFindAllPaymentsDTO;

export type FindAllPaymentsDTO = IBaseFindManyDTO<
  WhereDataFindAllPaymentsDTO,
  OrderByDataFindAllPaymentsDTO
>;

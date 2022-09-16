import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { InvoiceStatus } from '@/enums/invoice-status.enum';

export interface WhereDataFindAllInvoicesDTO {
  ids?: string[];
  app?: IWhereData;
  customer?: IWhereData;
  subscription?: IWhereData;
  product?: IWhereDataSearch;
  price?: IWhereData;
  currency?: IWhereData;
  status?: InvoiceStatus;
  active?: IWhereData<boolean>;
  stripeInvoice?: IWhereData;
  stripeCheckoutSession?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllInvoicesDTO =
  keyof WhereDataFindAllInvoicesDTO;

export interface OrderByDataFindAllInvoicesDTO {
  status?: IOrderBy;
  totalAmount?: IOrderBy;
  subtotalAmount?: IOrderBy;
  active?: IOrderBy;
  paidAt?: IOrderBy;
  canceledAt?: IOrderBy;
  paymentErrorAt?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllInvoicesDTO =
  keyof OrderByDataFindAllInvoicesDTO;

export type FindAllInvoicesDTO = IBaseFindManyDTO<
  WhereDataFindAllInvoicesDTO,
  OrderByDataFindAllInvoicesDTO
>;

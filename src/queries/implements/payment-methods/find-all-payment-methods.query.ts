import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllPaymentMethodsDTO,
  OrderByDataFindAllPaymentMethodsDTO,
  WhereDataFindAllPaymentMethodsDTO
} from '@/dtos/payment-methods/find-all-payment-methods.dto';

export class FindAllPaymentMethodsQuery
  implements IQuery, FindAllPaymentMethodsDTO
{
  where?: IWhere<WhereDataFindAllPaymentMethodsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllPaymentMethodsDTO;

  constructor(data: FindAllPaymentMethodsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

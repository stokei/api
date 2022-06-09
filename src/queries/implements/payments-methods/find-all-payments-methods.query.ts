import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllPaymentsMethodsDTO,
  OrderByDataFindAllPaymentsMethodsDTO,
  WhereDataFindAllPaymentsMethodsDTO
} from '@/dtos/payments-methods/find-all-payments-methods.dto';

export class FindAllPaymentsMethodsQuery
  implements IQuery, FindAllPaymentsMethodsDTO
{
  where?: IWhere<WhereDataFindAllPaymentsMethodsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllPaymentsMethodsDTO;

  constructor(data: FindAllPaymentsMethodsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

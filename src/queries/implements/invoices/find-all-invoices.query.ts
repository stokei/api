import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllInvoicesDTO,
  OrderByDataFindAllInvoicesDTO,
  WhereDataFindAllInvoicesDTO
} from '@/dtos/invoices/find-all-invoices.dto';

export class FindAllInvoicesQuery implements IQuery, FindAllInvoicesDTO {
  where?: IWhere<WhereDataFindAllInvoicesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllInvoicesDTO;

  constructor(data: FindAllInvoicesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

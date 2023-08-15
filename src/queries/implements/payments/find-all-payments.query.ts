import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllPaymentsDTO,
  OrderByDataFindAllPaymentsDTO,
  WhereDataFindAllPaymentsDTO
} from '@/dtos/payments/find-all-payments.dto';

export class FindAllPaymentsQuery implements IQuery, FindAllPaymentsDTO {
  where?: IWhere<WhereDataFindAllPaymentsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllPaymentsDTO;

  constructor(data: FindAllPaymentsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

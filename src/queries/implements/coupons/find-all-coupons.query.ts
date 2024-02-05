import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllCouponsDTO,
  OrderByDataFindAllCouponsDTO,
  WhereDataFindAllCouponsDTO
} from '@/dtos/coupons/find-all-coupons.dto';

export class FindAllCouponsQuery implements IQuery, FindAllCouponsDTO {
  where?: IWhere<WhereDataFindAllCouponsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCouponsDTO;

  constructor(data: FindAllCouponsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

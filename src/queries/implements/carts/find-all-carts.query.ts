import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllCartsDTO,
  OrderByDataFindAllCartsDTO,
  WhereDataFindAllCartsDTO
} from '@/dtos/carts/find-all-carts.dto';

export class FindAllCartsQuery implements IQuery, FindAllCartsDTO {
  where?: IWhere<WhereDataFindAllCartsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCartsDTO;

  constructor(data: FindAllCartsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

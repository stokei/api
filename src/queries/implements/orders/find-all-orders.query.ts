import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllOrdersDTO,
  WhereDataFindAllOrdersDTO,
  OrderByDataFindAllOrdersDTO
} from '@/dtos/orders/find-all-orders.dto';

export class FindAllOrdersQuery implements IQuery, FindAllOrdersDTO {
  where?: IWhere<WhereDataFindAllOrdersDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllOrdersDTO;

  constructor(data: FindAllOrdersDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

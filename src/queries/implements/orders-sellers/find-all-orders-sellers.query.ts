import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllOrdersSellersDTO,
  WhereDataFindAllOrdersSellersDTO,
  OrderByDataFindAllOrdersSellersDTO
} from '@/dtos/orders-sellers/find-all-orders-sellers.dto';

export class FindAllOrdersSellersQuery
  implements IQuery, FindAllOrdersSellersDTO
{
  where?: IWhere<WhereDataFindAllOrdersSellersDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllOrdersSellersDTO;

  constructor(data: FindAllOrdersSellersDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

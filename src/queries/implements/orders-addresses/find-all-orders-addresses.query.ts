import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllOrdersAddressesDTO,
  OrderByDataFindAllOrdersAddressesDTO,
  WhereDataFindAllOrdersAddressesDTO
} from '@/dtos/orders-addresses/find-all-orders-addresses.dto';

export class FindAllOrdersAddressesQuery
  implements IQuery, FindAllOrdersAddressesDTO
{
  where?: IWhere<WhereDataFindAllOrdersAddressesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllOrdersAddressesDTO;

  constructor(data: FindAllOrdersAddressesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllAddressesDTO,
  OrderByDataFindAllAddressesDTO,
  WhereDataFindAllAddressesDTO
} from '@/dtos/addresses/find-all-addresses.dto';

export class FindAllAddressesQuery implements IQuery, FindAllAddressesDTO {
  where?: IWhere<WhereDataFindAllAddressesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllAddressesDTO;

  constructor(data: FindAllAddressesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

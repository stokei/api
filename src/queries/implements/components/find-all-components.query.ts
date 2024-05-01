import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllComponentsDTO,
  OrderByDataFindAllComponentsDTO,
  WhereDataFindAllComponentsDTO
} from '@/dtos/components/find-all-components.dto';

export class FindAllComponentsQuery implements IQuery, FindAllComponentsDTO {
  where?: IWhere<WhereDataFindAllComponentsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllComponentsDTO;

  constructor(data: FindAllComponentsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

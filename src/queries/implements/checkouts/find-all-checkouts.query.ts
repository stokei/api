import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllCheckoutsDTO,
  WhereDataFindAllCheckoutsDTO,
  OrderByDataFindAllCheckoutsDTO
} from '@/dtos/checkouts/find-all-checkouts.dto';

export class FindAllCheckoutsQuery implements IQuery, FindAllCheckoutsDTO {
  where?: IWhere<WhereDataFindAllCheckoutsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCheckoutsDTO;

  constructor(data: FindAllCheckoutsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

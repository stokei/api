import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllPlansDTO,
  WhereDataFindAllPlansDTO,
  OrderByDataFindAllPlansDTO
} from '@/dtos/plans/find-all-plans.dto';

export class FindAllPlansQuery implements IQuery, FindAllPlansDTO {
  where?: IWhere<WhereDataFindAllPlansDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllPlansDTO;

  constructor(data: FindAllPlansDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

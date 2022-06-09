import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllRatingsDTO,
  OrderByDataFindAllRatingsDTO,
  WhereDataFindAllRatingsDTO
} from '@/dtos/ratings/find-all-ratings.dto';

export class FindAllRatingsQuery implements IQuery, FindAllRatingsDTO {
  where?: IWhere<WhereDataFindAllRatingsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllRatingsDTO;

  constructor(data: FindAllRatingsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

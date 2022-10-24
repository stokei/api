import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllRecurringsDTO,
  OrderByDataFindAllRecurringsDTO,
  WhereDataFindAllRecurringsDTO
} from '@/dtos/recurrings/find-all-recurrings.dto';

export class FindAllRecurringsQuery implements IQuery, FindAllRecurringsDTO {
  where?: IWhere<WhereDataFindAllRecurringsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllRecurringsDTO;

  constructor(data: FindAllRecurringsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

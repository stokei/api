import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllVideoAuthorsDTO,
  OrderByDataFindAllVideoAuthorsDTO,
  WhereDataFindAllVideoAuthorsDTO
} from '@/dtos/video-authors/find-all-video-authors.dto';

export class FindAllVideoAuthorsQuery
  implements IQuery, FindAllVideoAuthorsDTO
{
  where?: IWhere<WhereDataFindAllVideoAuthorsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllVideoAuthorsDTO;

  constructor(data: FindAllVideoAuthorsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

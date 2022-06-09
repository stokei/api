import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllVideosDTO,
  OrderByDataFindAllVideosDTO,
  WhereDataFindAllVideosDTO
} from '@/dtos/videos/find-all-videos.dto';

export class FindAllVideosQuery implements IQuery, FindAllVideosDTO {
  where?: IWhere<WhereDataFindAllVideosDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllVideosDTO;

  constructor(data: FindAllVideosDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

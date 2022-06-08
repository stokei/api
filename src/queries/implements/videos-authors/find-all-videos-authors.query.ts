import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllVideosAuthorsDTO,
  WhereDataFindAllVideosAuthorsDTO,
  OrderByDataFindAllVideosAuthorsDTO
} from '@/dtos/videos-authors/find-all-videos-authors.dto';

export class FindAllVideosAuthorsQuery
  implements IQuery, FindAllVideosAuthorsDTO
{
  where?: IWhere<WhereDataFindAllVideosAuthorsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllVideosAuthorsDTO;

  constructor(data: FindAllVideosAuthorsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}

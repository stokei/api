import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllCommentsDTO,
  OrderByDataFindAllCommentsDTO,
  WhereDataFindAllCommentsDTO
} from '@/dtos/comments/find-all-comments.dto';

export class FindAllCommentsQuery implements IQuery, FindAllCommentsDTO {
  where?: IWhere<WhereDataFindAllCommentsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCommentsDTO;

  constructor(data: FindAllCommentsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
